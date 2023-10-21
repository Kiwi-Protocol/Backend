# Backend

KiwiProtocol Backend

# Problems

1. **How do we verify whether a game sends us a correct experience change**  
   How do we verify that a game sends us a correct experience change? They could just make 10 achievments which are super easy to get and completely hack our systems.
   We need to figure out a way to verify the authenticity of an achievment so the above problem does not happen.
   Because we will have our set of APIs that we will expose to the third party gaming application which will call it with the id of the avatar and the gain/loss in experience.
   We need an onchain way to verify this so that a malicious third part provider can't just reduce or increase some persons experience.

   One way that I can think of is that when the user is logged into a game and gets an achievment the game provider will send us a signature that we can verify as true so we know that the achivement was achieved by the user when he was logged in. This will need to be unique to each achievment, so that signatures can't be reused. Each achievment that is to be used in collaboration with our platform will have a unique id and the users address combined with it along with a unique key might form a one time use unique signature. I dont know how we would do this though.

   And even if the above problem is solved the problem to vet the achievments still remains.

2. **Lack of documentation**
   The lack of a proper documentation caused a bunch of integration problems especially for Push Chat and Sui


# Tracks

1. **Spheron**
   Used spheron for its cloud computing functionalities. Used its Storage V2 SDK and spheronClient to store data on IPFS and IPNS.
   Used spheron for hosting the Express backend app.
2. **Superteam - Composable Loyalty NFT**
   Kiwi protocol is a decentralized identity protocol that serves as a proof of repuation for gaming communities. We provide users with an onchain avatar that grows and evolves with them. This is a transferable avatar that can gain experience from the games it plays and changes with them.
   We expose our services to the third party game developers by allowing them to use our identity services to model hyper customized avatars for their users to improve engagement. They can use our platform to create an achievement set and then use our API's to serve them.
   On the basis of these achievments the game provider can offer experience/perks that allow the players avatar to evolve which further improves engagement.

# Important Features
1. Gasless transactions to enable smooth onboarding for users.
2. Dynamic avatars whoose attributes can be changed and evolved.
3. Decentralized compute.

# Further Scope
1. Extend the current functionality to create a gaming centric identity protocol.
2. Make the avatars cross chain to allow improved collaboration and better user experience.
3. Explore additional monetization opportunities.

# Deployed Links:
Frontend: https://www.kiwiprotocol.xyz/
Backend: https://kiwiprotocol.onrender.com/
   
