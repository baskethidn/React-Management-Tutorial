import React from "react";
import post from 'axios'; 

class CustomerAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
                file : null,
                username : '',
                birthday : '',
                gender: '',
                job: '',
                filename : ''
        }
    }

    render()
    {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.filename} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            
        )
    }    

    

    handleFormSubmit =(e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response)=> {console.log(response.data);
                this.props.stateRefresh();
            }
            )
            this.setState({
                file : null,
                username: '',
                birthday : '',
                gender : '',
                job : '',
                filename : ''
            })
            //window.location.reload();
            

    }

    handleFileChange =(e) => {
        this.setState(
            {
                file: e.target.files[0],
                filename: e.target.value
            }
        )
    } 
    
    handleValueChange =(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }      

    addCustomer = () => {
        const url ='/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers : {
                'content-type': 'multipart/form-data'
            }
        }
        // // FormData의 key 확인
        // for (let key of formData.keys()) {
        //     console.log(key);
        // }
        
        // // FormData의 value 확인
        // for (let value of formData.values()) {
        //     console.log(value);
        // }

        return post.post(url, formData, config);
    }
}

export default CustomerAdd;