import React from 'react';
import Paper from 'material-ui/Paper';
import Product from './Products';


const style = {
    height: 800,
    width: 900,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  let Products=[
    {
        id:1, 
        img_link:"https://staticimg.titan.co.in/production/India/Fastrack/detail2/6150SM04.jpg",
        alt:"Fastrack Women's Watch",
        name:"Fastrack Women's Watch", 
        description:"Analog Pink Dial Women's Watch - 6150SM04",
        price:1800
    },
    {
        id:2,
        img_link:"https://i.ebayimg.com/images/g/4LUAAOSw3YJZVuBu/s-l300.jpg",
        alt:"Yonex Badminton Racquet",
        name:"Yonex Voltric 80 E-tune Badminton Racquet Deep, Red", 
        description:"Frame: H.M. Graphite, NANOMETRIC, Tungsten Shaft: H.M. Graphite, NANOPREM Weight / Grip Size: 4U (Ave.83g) G4,5 3U (Ave.88g) G4,5",
        price:2500
    },
    {
        id:3, 
        img_link:"http://images.fonearena.com/blog/wp-content/uploads/2017/02/Lenovo-Tab-4-10-Plus.jpg",
        alt:"Lenovo Tab 4 Tablet",
        name:"Lenovo Tab 4 10  Tablet  (Slate Black)", 
        description:"16 GB 10.1 inch with Wi-Fi+4G",
        price:6000
    },
    
];

  
export default class Cart extends React.Component{
 
    onClick = () => {
        this.child.calctotal() // do stuff
      }

render(){
    return(
        <div> 
            <Paper style={style} zDepth={1} > 
                <div> 
                    <div>
                        <h3> here are the products ! </h3>
                    </div> <hr/>
                    <div>
                         {Products.map(productlist =>{    
                           return <Product  key={productlist.id} name={productlist.name}
                            description={productlist.description} price={productlist.price}
                            src={productlist.img_link} alt={productlist.alt} />
                        })}   
                            
                   {/*  <div>
                        <Product setClick={click => this.clickChild = click}/>
                        <button onClick={() => this.clickChild()}>Call products total function</button>
                    </div> */}
                    

                    </div>
                    
                </div>
                
            </Paper>
        </div>
    );
}
}
    
