import React, {Component} from  'react'
import {PARAMS, VALUES} from './norms.constants.js'

class Norms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {...VALUES}
        }
    }

    handledTextChange = param => {
        return (e) => {
          const values = this.state.values
          values[param] = e.target.value
          this.setState({values})
          console.log(values)
        }
      }

      saveParams = () =>{
          console.log("save me clicked")
          }
    render() {
        return (
            <div style={{textAlign: "rigth"}}>
                <button onClick={this.saveParams}>Save me</button>
                <table style={{
                    textAlign: "left", 
                    width:"100%",
                    marginLeft:100,
                    overflow: 'scroll',
                    
                    }}>
                    <thead>
                    <tr>
                        <th>Պարամետր</th>
                        <th>Պարամետրի արժեք</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>
                        <span>Քննություն</span> 
                    </th>

                    <th>
                        <input key={PARAMS.EXAMINATION}
                        onSelect={this.handledTextChange(PARAMS.EXAMINATION)}
                        title="գործակից որը բազմապատկելով ուսանողնների քանակի վրա կստանանք ծախսված ժամանակը" 
                        placeholder="գործակից"/>
                    </th>
                </tr>
            
                <tr>
                    <th>  
                        <span> Ստուգարք</span>  
                    </th>

                    <th>
                        <input key= {PARAMS.TESTING} 
                        onSelect={this.handledTextChange(PARAMS.TESTING)}
                            title="title"
                            placeholder="գործակից"/>
                    </th>
                </tr>
                <tr>
                    <th>
                         <span>Կոնսուլտացիա քննություն</span> 
                          </th>
                    <th>
                        <input key={PARAMS.CONSULTATION_EXAMINATION}
                        onSelect={this.handledTextChange(PARAMS.CONSULTATION_EXAMINATION)}
                        title="" 
                        placeholder="արժեք"/>
                    </th>
                </tr>
                <tr>
                    <th> 
                        <span>Կոնսուլտացիա ստուգարք</span> 
                        </th>
                    <th>
                        <input key= {PARAMS.CONSULTATION_TESTING} 
                        onSelect={this.handledTextChange(PARAMS.CONSULTATION_TESTING)}
                            title=""
                            placeholder="արժեք"/>
                    </th>
                </tr>
                <tr>
                    <th> 
                            <span>Կուրսային աշխատանք</span> 
                    </th>
                
                    <th> 
                         <input key= {PARAMS.COURSE_WORK} 
                        onSelect={this.handledTextChange(PARAMS.COURSE_WORK)}
                            title=""
                            placeholder="արժեք"/>
                    </th>
                </tr>

                
                <tr>
                    <th> 
                            <span>Կուրսային նախագծում</span> 
                    </th>
                
                    <th> 
                         <input key= {PARAMS.COURSE_PROJECT} 
                        onSelect={this.handledTextChange(PARAMS.COURSE_PROJECT)}
                            title=""
                            placeholder="արժեք"/>
                    </th>
                </tr>
                
                <tr>
                    <th> 
                            <span>Պրակտիկա</span> 
                    </th>
                
                    <th> 
                         <input key= {PARAMS.PRACTICE} 
                        onSelect={this.handledTextChange(PARAMS.PRACTICE)}
                            title=""
                            placeholder="շաբաթական քանի ժամ"/>
                    </th>
                </tr>


                <tr>
                    <th> 
                        <span>Լաբեր</span> 
                    </th>
                
                    <th> 
                         <input key= {PARAMS.LAB} 
                        onSelect={this.handledTextChange(PARAMS.LAB)}
                            title=""
                            placeholder="ուսանողների քանակ"/>
                    </th>
                </tr>


                <tr>
                    <th> 
                        <span>Գործնական</span> 
                    </th>
                
                    <th> 
                        <input key= {PARAMS.PRACTICAL} 
                        onSelect={this.handledTextChange(PARAMS.PRACTICAL)}
                            title=""
                            placeholder="ուսանողների քանակ"/>
                    </th>
                </tr>


                <tr>
                    <th> 
                            <span>Դիպլոմային</span> 
                    </th>
                
                    <th> 
                         <input key= {PARAMS.DIPLOMA} 
                        onSelect={this.handledTextChange(PARAMS.DIPLOMA)}
                            title=""
                            placeholder="մեկ ուսանողին հասնող ժսմերը"/>
                    </th>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

export default Norms