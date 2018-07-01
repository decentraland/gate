import * as React from 'react';
import 'decentraland-ui/lib/styles.css';

import { Stats, Navbar, Button } from 'decentraland-ui';

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className='ui container'>
            <div className='ui centered grid'>
                <div className='two column centered row'>
                    <h1>Iron Age Beta</h1>
                </div>
                <div className='row'/>
                <div className='three column centered row'>
                    <Stats title="Invites available">
                        4
                    </Stats>
                </div>
                <div className='two column centered row'>
                    <div className='column'>
                    <form className='ui form'>
                        <div className='field'>
                            <input type='text' className='ui' name='address' placeholder='Address to invite' />
                        </div>
        <div style={{textAlign: 'center'}}>
                        <Button primary type='submit'>Send</Button>
        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
