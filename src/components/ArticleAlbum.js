import React from 'react';
import sortBy from 'lodash/sortBy';

export default class ArticleAlbum extends React.Component {
  
  constructor (props){
    super(props);
    this.state={
        albums : this.props.albums
    };
   
    this.sortby = this.sortby.bind(this);
  }
  
  sortby(){
    var tab =  _.sortby(this.state.albums, 'title');
    this.setState({
              albums : tab
      });
  }
  
  
  render() {
    return (
            <div>
                            
                { this.state.albums.map( (alb,idx) => { return(
                                                    <div key={idx} className="album">
                                                      <img src={alb.URL}/>
                                                      <h2><a href={`/photos/${alb.id}`}>{alb.title}</a></h2>
                                                    </div>
                                                    );
                                                 }
                                       )
                }
            </div>
        
    );
  }
}