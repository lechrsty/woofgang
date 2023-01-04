import "./Home.css"
import { DogList } from "../dogs/DogList"

export const Home = () => {
    return <>
    <div className="container">
  <h1>Welcome to WoofGang</h1>
  <p-hero>Join the pack.</p-hero>
  <a href="/login">Login | Register</a>
</div>

<div className="blank">
<p-hero>Whether you're new to a city or looking to expand your social circle, WoofGang is a simplified way to create meaningful friendships.</p-hero>
</div>

<div className="container second">
  <div className="home-item">
    <div className="img img-second"></div>
    <div className="card">
      <h3>Play</h3>
      <p>Socialize your dogs with the right match based on similar activity levels in a judgement-free zone. </p>
    </div>
  </div>
  <div className="home-item">
    <div className="img img-third"></div>
    <div className="card">
      <h3>Learn</h3>
      <p>Ensure that your dogs have a teammate to develop and refine their new skills with.</p>
    </div>
  </div>
  <div className="home-item">
    <div className="img img-first"></div>
    <div className="card">
      <h3>Connect</h3>
      <p>Work hard, play harder. No matter the technical outcome, we encourage all to prioritize a good time.</p>
    </div>
  </div>
</div>
    </>
}     