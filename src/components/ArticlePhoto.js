import React from 'react';

 
export default class ArticlePhoto extends React.Component {
    
  render() {
    return (
            <div>
                { this.props.photos.map( (photo,idx) => { return(
                                                    <div key={idx} className="photo">
                                                    <input type="checkbox" id={idx} />
                                                    <label htmlFor={idx}>
                                                    <img src={photo.URL} />
                                                    </label>
                                                    </div>
                                                     );
                                                 }
                                       )
                }
            </div>
        
    );
  }
}