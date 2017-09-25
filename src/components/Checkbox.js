  import React from 'react';
 export default class Checkbox extends React.Component {
  constructor() {
    super();

    this.state = { selected: false,
                   selectedImage : ""
                   };
  //  this.handleChange = this.handleChange.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
  }

 /* handleChange() {
    this.setState({
      selected: !this.state.selected
    })
  }*/
  
  onSelectImage (index, event) {
        event.preventDefault();
        this.setState({
           selectedImage :  this.props.image[index],
           selected : true
        })
    }

  render() {

    return <div>
      <div>
         <div
          onClick={this.onSelectImage}
          >
          <p>{this.state.selectedImage}</p>
          <img src={this.props.image} />         
          </div>
      </div>
    </div>;
  }
}