import { ChangeEvent, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { writeContract } from 'wagmi/actions';
import { config } from './wagmi';
import {ABI,SMART_CONTRACT_ADDRESS} from "./constants"
function App() {
  interface MetaData {
    name: string;
    description: string;
    external_url: string;
    [key: string]: any; // This allows for additional properties
}

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const[tweetUrl,setTweetUrl] = useState("");
  const handleInput = (event:ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setTweetUrl(event.target.value);
    console.log("Tweet url = ",tweetUrl)
  }
  const handleClick = async () => {
    const response = await fetch("http://localhost:8000/api/tweets/screenshot/",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          tweet_url:tweetUrl
        })
    })
    const json_cid = (await response.json()).data.json_cid;
    await writeContract(config,{
     address:SMART_CONTRACT_ADDRESS,
     abi: ABI,
     functionName:"safeMint",
     args:[
      `ipfs://${json_cid}`
     ]
    })
  }
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <div>
        <h2> Mint Tokens</h2>
        <input type="url" name="tweetUrl" id="tweetUrl" onChange={(e)=>handleInput(e)}/> <br />
        <button onClick={handleClick}>Click here to mint Token</button>
      </div>
    </>
  )
}

export default App
