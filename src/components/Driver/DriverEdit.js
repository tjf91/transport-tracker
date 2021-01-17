import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import randomstring from 'randomstring'
import axios from 'axios'

export default function DriverEdit (props){
    const[isUploading,setIsUploading]=useState(false)
    const[url,setUrl]=useState('http://via.placeholder.com/450x450')    
    const getSignedRequest=([file])=>{
        setIsUploading(true)
        const fileName = `${props.driver.name.replace(/\s/g, '-')}-${props.driver.driver_d_id}-profile_pic`; 
        
        axios.get('/api/s3',{
            params:{
                'file-name':fileName,
                'file-type': file.type,
            }
        })
        .then(res=>{
            console.log('signed response from server',res.data)
            const { signedRequest, url}=res.data            
            uploadFile(file,signedRequest,url)
        })
        .catch(e=>console.log(e))

        const uploadFile=(file,signedRequest,url)=>{
           const options ={
               headers:{
                   'Content-Type':file.type
               }
           } 
           axios.put(signedRequest, file, options)
           .then(res=>{
               console.log('axios put request',res.data)
               setIsUploading(false)
               setUrl(url)
               console.log('url state has been set',url)
               //Need DB request here
               axios.put(`/companies/${props.driver.company_id}/drivers/${props.driver.driver_d_id}?q=profile_pic`, {url})
            .then(res=>{
                console.log('res.data from the db request',res.data)
                props.updatePic(url)})
            .catch(e=>console.log(e))
           props.handleFormToggle(false)
        })
           .catch(e=>{
               setIsUploading(false)
               if(e.status === 403){
                   alert(`Your request for a signed URL failed with a status 403. Double check the CORS configuration  ${e.stack}`)
               }
               else{
                   alert(`ERROR : ${e.status}\n ${e.stack}`)
               }
           })

        }
    }
    return(
        <div>
            <Dropzone
    onDropAccepted={getSignedRequest}
    accept="image/*"
    multiple={false}>
    {({getRootProps, getInputProps}) => (
    <div 
        style = {{
        position: 'relative',
        width: 160,
        height: 80,
        borderWidth: 5,
        marginTop: 25,
        borderColor: 'gray',
        borderStyle: 'dashed',
        borderRadius: 5,
        display: 'inline-block',
        fontSize: 17,}}
        {...getRootProps()}>
        <input {...getInputProps()} />
        {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
    </div>
    )}
</Dropzone>
        </div>
    )
}