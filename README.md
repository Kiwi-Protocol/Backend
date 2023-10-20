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
