import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import PropTypes from 'prop-types';
import './App.css';


const btn_style={
    cursor:"pointer"
}
 
// const total=0; 

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={ count:1,total:0, sub_total:0,
        }
    }
    
   /* componentDidMount() {
        this.props.setClick(this.calctotal)
     }  */

    addOne() {                                                       // adds one item when button clicked                                  
            this.setState(prevState => {
          return {count : prevState.count + 1 }
         });
        }
    
       removeOne() {                                                 // removes one item when button clicked
        this.setState(prevState => {
            if(prevState.count>=1) {
          return { count : prevState.count - 1 }
            }
            else{
                alert('quantity cant be less than zero')
            }
         });
       }

     /*  calculate(){                                             // another way to calculate the sub total
      //  var qty=document.getElementById('qty_div').value;
        //var qty1=Number(qty);
        // console.log(qty);
        let qty = document.getElementById('qty_div').innerHTML;
        let result = qty.match(/\d+/g);
        console.log(result[0]);
        let sub_price_value=document.getElementById("price_row").innerHTML;
        let sub_price= sub_price_value.match(/\d+/g);
        let sub_price_result=sub_price[0];
       console.log(sub_price_result);
    }  */

    calc(){
            var subtotal= Number(this.props.price * this.state.count).toFixed(2);
            // this.calctotal();
            console.log('subtotoal is '+ subtotal);
            return subtotal;
            document.getElementById("show_sub").innerHTML = " Sub total is: " +subtotal; 

          }
        
     calctotal(){
                this.setState(prevState => {
               sub_total : prevState.Sub_total + this.calc()});
               console.log('sub_total is'+this.state.subtotal)
          }


    render(){
        return(
            <div>
                <Table >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                        <TableRow>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow >
                            <TableRowColumn><img src={this.props.src}  width="20" height="20" 
                                alt={this.props.alt} className="zoom" />
                             </TableRowColumn>
                            <TableRowColumn style={{textWrap:'normal', wordWrap:'breakWord'}}>{this.props.name}<br/> {this.props.description}</TableRowColumn>
                            <TableRowColumn id="price_row" >Price per each item:<br/> {this.props.price} <br/>
                                <p> subtotal is: </p><span id="show_sub" >{ this.calc()} </span>
                            </TableRowColumn>
                            <TableRowColumn>
                                <input style={btn_style} type='button' onClick={this.addOne.bind(this)} value='add an item'/>
                                <input style={btn_style} type='button' onClick={this.removeOne.bind(this)} value='remove an item'/>
                                <br/> <div> quantity: </div> <div id="qty_div" > {this.state.count}  </div> 
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                 </Table>
            </div>
        );
    }
}

Product.propTypes={
    name:PropTypes.string,
    price:PropTypes.number,
    description:PropTypes.string,

};
