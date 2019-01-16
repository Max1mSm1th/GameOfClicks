import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import characters from "./cards.json";
import "./App.css";

class App extends Component {
  state = {
    characters,
    clickedCharacterIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedCharacterIds = this.state.clickedCharacterIds;

    if(clickedCharacterIds.includes(id)){
      this.setState({ clickedCharacterIds: [], score: 0, status:  "You know nothing. Play again!" });
      return;
    }else{
      clickedCharacterIds.push(id)

      if(clickedCharacterIds.length === 12){
        this.setState({score: 12, status: "Victorious! Click a character to play again.", clickedCharacterIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ characters, clickedCharacterIds, score: clickedCharacterIds.length, status: " " });

      for (let i = characters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div class="App-title">
      </div>
        </header>
        
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />

        <Wrapper>
          {this.state.characters.map(char => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={char.id}
              key={char.id}
              image={char.image}
            />
          ))}
        </Wrapper>
    </div>
    );
  }
}

export default App;
