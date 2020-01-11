import * as React from "react";
import "./styles/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface AppProps {
  backendURL: string;
}

interface AppState {
  value: string;
}

class App extends React.Component<AppProps, AppState> {
  handleSubmit = (event: React.FormEvent) => {
    if (this.state === null || this.state.value.trim().length === 0) {
      event.preventDefault();
    }
  };

  render() {
    return (
      <div id="content">
        <img
          id="logo"
          width="58px"
          alt="tiktok logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/TikTok_Logo.svg/1200px-TikTok_Logo.svg.png"
        />
        <h1 id="title" className="text-shadow">
          <span id="tik">Tik</span>
          <span id="tok">Tok</span> Video Downloader
        </h1>
        <form onSubmit={this.handleSubmit} action={this.props.backendURL}>
          <input
            onChange={event => this.setState({ value: event.target.value })}
            id="url"
            className="box-shadow"
            name="url"
            placeholder="Insert the URL here"
          ></input>
          <br />
          <button id="submit" className="box-shadow" type="submit">
            <FontAwesomeIcon icon={faDownload} className="icon" />
            Download
          </button>
        </form>
      </div>
    );
  }
}

export default App;
