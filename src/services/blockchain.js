import address from '../contracts/contractAddress.json'
import abi from '../contracts/Campaign.json'
import { getGlobalState, setGlobalState } from '../store';


const ethers=require("ethers");
const contractAbi=abi.abi;
const contractAddress = address.address
const {ethereum} = window;
let tx;

const connectWallet= async()=>{
    try{
        if(!ethereum) return alert("Please install Metamask");

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts' 
        })
        setGlobalState('connectedAccount',accounts[0].toLowerCase());
        // console.log(accounts);
    }catch(error){
        reportError(error);
    }
}

const isWalletConnected= async()=>{
    try{
        if(!ethereum) return alert("Please install Metamask");

        const accounts=await ethereum.request({
            method: 'eth_requestAccounts'
        })
       
        setGlobalState('connectedAccount',accounts[0].toLowerCase());

        window.ethereum.on('chainChanged',(chainId)=>{
            window.location.reload();
        })

        window.ethereum.on('accountsChanged',async()=>{
            setGlobalState('connectedAccount',accounts[0].toLowerCase());
            await isWalletConnected()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0].toLowerCase())
        } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
        }
    }catch(error){
        reportError(error);
    }
}


const getEthereumContract=async()=>{
    const connectedAccount=getGlobalState('connectedAccount');

    if(connectedAccount){
        const provider=new ethers.BrowserProvider(ethereum);
        const signer=await provider.getSigner();
        const contract=new ethers.Contract(contractAddress,contractAbi,signer);

        return contract;
    }
    else{
        return getGlobalState('contract');
    }
}

const createProject=async({title,description,imageURL,cost,expiresAt})=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const contract=await getEthereumContract();
        cost = ethers.parseEther(cost); //from string or num to wei
      
        // console.log(title,description,imageURL,cost,expiresAt);
        tx=await contract.createProject(title,description,imageURL,cost,expiresAt);

        await tx.wait();
        await loadProjects();
    }catch(error){
        // console.log(error)
        reportError(error);
    }
}

const updateProject=async({id,title,description,imageURL,expiresAt})=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const contract=await getEthereumContract();
        tx=await contract.updateProject(id,title,description,imageURL,expiresAt);

        await tx.wait();
        await loadProject(id);
    }catch(error){
        reportError(error);
    }
}


const deleteProject=async(id)=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const contract=await getEthereumContract();
        await contract.deleteProject(id);
    }catch(error){
        reportError(error);
    }
}


const loadProjects=async()=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const contract=await getEthereumContract();
        const projects=await contract.getProjects();
        const stats=await contract.stats();

        setGlobalState('projects',structuredProjects(projects));
        setGlobalState('stats',structureStats(stats));
        // console.log(structuredProjects(projects),structureStats(stats));
    }catch(error){
        reportError(error);
    }
}

const loadProject=async(id)=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const contract=await getEthereumContract();
        const project=await contract.getProject(id);

        setGlobalState('project',structuredProjects([project])[0]);
    }catch(error){
        alert(JSON.stringify(error.message))
        reportError(error);
    }
}

const backProject = async(id,amount) => {
    try{
        if(!ethereum) return alert('Please install Metamask');
        const connectedAccount = getGlobalState('connectedAccount');
        const contract=await getEthereumContract();
        amount = ethers.parseEther(amount);

        tx=await contract.backProject(id,{
            from:connectedAccount,
            value:amount,
        })
        
        await tx.wait();
        await getBackers(id);
    }catch(error){
        reportError(error);
    }
}

const getBackers = async(id)=>{
    try{
        if(!ethereum) return alert("Please install Metamask");

        const contract=await getEthereumContract();
        let backers = await contract.getBackers(id);

        setGlobalState('backers',structuredBackers(backers));
        // console.log(structuredBackers(backers));
    }catch(error){
        reportError(error);
    }
}

const payoutProject= async(id)=>{
    try{
        if(!ethereum) return alert("Please install Metamsak");
        const connectedAccount=getGlobalState('connectedAccount');
        const contract=await getEthereumContract();

        tx=await contract.payoutProject(id,{
            from: connectedAccount,
        })

        await tx.wait();
        await getBackers(id);
    }catch(error){
        reportError(error);
    }
}


const structuredBackers = (backers) =>
  backers.map((backer) => ({
      owner: backer.owner.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(parseInt(backer.timestamp,10) * 1000).toJSON(),
      contribution: parseInt(backer.contribution,10) / 10 ** 18,
})).reverse()

const structuredProjects = (projects) =>
  projects.map((project) => ({
      id: parseInt(project.id,10),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: parseInt(project.timestamp,10),
      expiresAt: new Date(parseInt(project.expiresAt,10)).getTime(),
      date: new Date(parseInt(project.expiresAt,10) * 1000).toLocaleDateString(),
      imageURL: project.imageURL,
      raised: parseInt(project.raised,10) / 10 ** 18,
      cost: parseInt(project.cost,10) / 10 ** 18,
      //very big num(BigInt) so phle hex me convert kr lenge fir parse int kr lenge fir kyuki wei me h to /10^18 kr denge
      backers: parseInt(project.backers,10),
      status: project.status,
})).reverse()

//reversed the arr so that the newest ones will be at front

const structureStats = (stats) => ({
  totalProjects: parseInt(stats.totalProjects,10),
  totalBacking: parseInt(stats.totalBacking,10),
  totalDonations: parseInt(stats.totalDonations,10) / 10 ** 18,
})


export {
  connectWallet,
  isWalletConnected,
  createProject,
  updateProject,
  deleteProject,
  loadProjects,
  loadProject,
  backProject,
  getBackers,
  payoutProject,
}