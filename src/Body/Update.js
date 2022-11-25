import { Component } from "react";

class Update extends Component{
    state={
        pname : ''
    }

    changeHandler = (e)=>{
        this.setState({
            [e.target.name] : e.target.value

        })
       
    }
    render(){
        <div>
            <form>
                <p>
                <input type ="text" name="pname"
                 value={this.state.pname}
                 onChange={this.changeHandler}  />

                </p>
            </form>
        </div>
    }
}