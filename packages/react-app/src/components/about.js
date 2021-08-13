export const About = (props) => {
    return (
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <p>{props.data ? props.data.paragraph : "loading..."}</p>
                <h3>How does it work?</h3>
                We are a decentralized autonomous organization (DAO) that runs on the ethereum blockchain. In order to use our peer-reviewing system, you must connect to a web3 wallet. 
                Our network consists of 3 parties: Reviewers (called Scholars), Validators and Authors.
                Authors submit their papers for peer-review from Scholars with a validator tip in eth.  
                If the reviews are positive, the paper moves to pre-publishing stage where validators choose to publish the paper on the network.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  