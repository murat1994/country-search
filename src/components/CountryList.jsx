import React from 'react';
import CountryCard from './CountryCard';
import axios from 'axios';


class CountryList extends React.Component {
    state={
        countries: []
    }
    componentDidMount(){
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(rsp => {       
        this.setState({
          countries:rsp.data.slice(0,30)
        })
    })
    }

    // componentDidMount(){
    //     axios.get('https://restcountries.eu/rest/v2/lang/es')
    //     .then(rsp => {       
    //     this.setState({
    //       countries:rsp.data
    //     })
    // })
    // }
     searchHandler = (e) => {
        //console.log(e.target.value)
        axios.get('https://restcountries.eu/rest/v2/name/'+e.target.value)
        .then(res=> {
            //console.log(res.data)
            this.setState({
                countries: res.data
            })
        })

    }

    
    render(){
       const CountryList = this.state.countries.map(ct=> {
           return (
              <CountryCard country={ct} key={ct.numericCode}/>
              
           )
       })
       return (
           <div>
        <input type="text" name='search' className="form-control mb-3" onChange={this.searchHandler} placeholder="Ülke Adı Giriniz"></input>
           <div className="card-columns" >
               {CountryList}
               </div>
           </div>
       )
    }
}

export default CountryList;