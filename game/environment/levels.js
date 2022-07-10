const levels = []

function loadNewLevel(mapStr, message, theme) {
  levels.push({
    bitmap: mapStr instanceof Array ? mapStr : mapStr.split('\n'),
    message,
    theme
  })
}

let _colors = {
  player: `#81716F`,
  iceboss: `#84ADA7`,
  fireboss: `#D5784A`,
  stoneboss: `#5A5A70`,
  plantboss: `#637F67`,
  env: `#EDC864`,
  white: `#FFF`,
  dragon: `#844344`
}

loadNewLevel(" î          î                          2\n      @           G                    2\n                <000000>               2\n0000>  G G <000044444444000000000000>  2\n44444>    <44111111111111111111444443  2\n    \\4000044/                  \\1111/  2\n                  î                    2\n               3      <0>             <4\n          000  400000044/  \\/     <00044\n          \\1/                  00044/   \n>     \\1/          <                    \n3                 +2                    \n3       î          2                    \n3     <000>        2                    \n\\000004444400000000/                    ", [
  [_colors.iceboss, "\"He's escaping!  Capture the fugitive!!\""],
  [_colors.player, "\"I need to get out of here, they're gaining on me.\""],
  [_colors.env, "A dragon soars overhead and kills an ice soldier"],
  [_colors.player, `"I'm in the tall grass now, I hope they can't see me.  What's this?"`],
  [_colors.env, "You pick up a chili pepper lying amongst the grass"],
  [_colors.player, `"The dragon seems to have stopped breathing fire, maybe this will help."`],
  [_colors.env, "You throw the chili pepper up into the sky and the dragon catches it."],
  [_colors.dragon, `Dragon: "I've been needing some of this"`],
  [_colors.env, "The dragon inhales and destroys all the ice soldiers trying to get you."],
  [_colors.dragon, `Dragon: "Let's get out of here, run and I'll cover you."`],
  [_colors.white, `Arrow Keys/WASD to move, jump on enemies to kill them or use dragon fire`],
  [_colors.white, `Hold mouse to aim, release to shoot (when green), collect peppers to charge up the dragon's fire`],
  [_colors.white, `Kill all enemies and then the portal will appear.\nYou might have to search for it sometimes.`]
], "Ice")

loadNewLevel("<4111111111111111111111111114>\n4/@                         \\4\n3    G        G       O      2\n4>                           2\n\\400000000000000000000000    2\n                              \n                              \n                              \n               +           R  \n>                :           <\n3                            2\n3            <000>           2\n3          <0444440>         2\n4>       <04444444440>      <4\n\\4000000044444444444400000004/", [
  [_colors.dragon, `Dragon: "I was sent to attack the Ice kingdom, but failed."`],
  [_colors.dragon, `"We're going to go outside the universe and then back in, so we can get\nto the Fire kingdom instantaneously."`],
  [_colors.player, `"Outside the universe?", you question.`],
  [_colors.dragon, `"Yes, " says the dragon, "Could you help me get those peppers so I\ncan charge my fire back up?"`],
  [_colors.player, `"Sure," you reply, "Also, thank you for saving my life."`],
  [_colors.env, `A blinding flash of light makes contact with your eyes, and is gone.  You are now\noutside the universe`]
], "Portal")

loadNewLevel("         <411111111114>                 \n         4/          \\3                 \n         3            3     000>        \n         3            3     3  \\>    <  \n         3            3     3       <4  \n         3            3  2  3      <44  \n         3               2  3           \n         3               2  4111>       \n111111111/                  3   \\>      \n                     <000   3    \\>     \n@                   </      3           \n      ƒ ƒ          </       3+ ƒƒƒ   <  \n               <000/        3       </  \n           <000/            3      </   \n00000000000/                4000000/    ", [
  [_colors.dragon, `Dragon: "The soldiers here don't really like you.  We can kill them since they can be cloned easily"`],
  [_colors.dragon, `"I'll escort you to my master and tell him you're not a bad guy.\nThen, maybe you and me can help take over the ice kingdom."`],
  [_colors.player, `"Sounds good", you say, "Why do you fight against the ice kingdom?"`],
  [_colors.dragon, `"A long time ago, there was a dragon kingdom," the dragon says.\nHe reaches back into his memory to tell you the story.`],
  [_colors.dragon, `"The ice kingdom decided to wipe out all the dragons, to try and take over our land.\nWe made an aligience with the fire kingdom, but still they overpowered us.`],
  [_colors.dragon, `The fire kingdom gave us the ability to breathe fire if we would protect them.\nBoth we and the fire kingdom fought hard against the ice kingdom, but to no avail.`],
  [_colors.dragon, `All dragons but I were slain, and the fire kingdom retreated.\nThe ice and fire kingdoms signed a treaty to not attack each other.`],
  [_colors.dragon, `The ruler of the ice kingdom didn't know I still existed until now, and he\nis trying to hunt me down.  He also is breaking the treaty\nby sometimes capturing and killing soldiers from the fire kingdom.`],
  [_colors.dragon, `That, my friend, is why we fight, since the treaty no longer exists.\nThat being said, let's get you to my master.`]
], "Fire")

loadNewLevel(`
3              :             2
3    R                  G    2
3                            2
3   411  2          3  114   2
3  4/    2          3    \\4  2
3 4/ G   2    F     3     \\4 2
3 3      2          3      2 2
3 3                        2 2
3 3                        2 2
3                            2
3            @       R       2
3   O   \\1/    +   \\1/   :   2
3                            2
3  \\1/       2443       \\1/  2
3            \\11/            2
3                            2
3       <0>        <0>       2
3      <443 R    R 244>      2
4>    <4443        2444>    <4
440000444440000000000000000044`, [
  [_colors.env, "You and the dragon enter the throneroom of Ignathor, who rules the fire realm."],
  [_colors.dragon, `"Master, I have returned from the ice realm, almost defeated."`],
  [_colors.env, "You notice a wound near the dragon's neck, stabbed through with an icicle previously"],
  [_colors.dragon, `"I bring to you a being who has saved me from them by restoring my flame.  He seemed to\nhave been a prisoner captured by the ice kingdom."`],
  [_colors.fireboss, `"Why do you bring him to me?" thunders Ignathor, his voice shaking the walls all around.`],
  [_colors.dragon, `"He could be a valuable asset in the art of war, enabling us to take over the realm of ice together."`],
  [_colors.fireboss, `"Kill him, he is of no value," roars Ignathor.`],
  [_colors.dragon, `"I shall not let you do that, sire, for he has saved my life," exclaims the dragon, truimphantly.`],
  [_colors.fireboss, `"Then I will do it myself".`]
], "Fire")

loadNewLevel(" <444/  111144444/\\>\n<444/  3 @  2444/  2\n444/   3    244/   2\n44/    3    24/ R  2\n4/     3   <4/     2\n3      40  1/   <  2\n3      \\4      </  2\n3   >   \\>    </   2\n4   \\>   \\>  </   </\n\\>   \\>   \\></   </ \n \\> O \\>   \\/   </  \n  \\>   \\>      </   \n   \\>   \\>  G </   +\n    \\>   \\>  </     \n     \\>   \\></   <00\n      \\>   \\/   </  \n       \\> :    </   \n        \\>    </    \n         \\>  </     \n          \\></      ", [
  [_colors.player, `"You saved me again," the words slowly form from your mouth, "You didn't have to kill your master."`],
  [_colors.env, `The dragon remains silent.`],
  [_colors.player, `"Why did you do that?  Was there not an aligience?" you ask.`],
  [_colors.dragon, `"Ignathor isn't my type, I could care less," the dragon says, his voice full of pain.`],
  [_colors.player, `"There's more to that, why are you lying to me?"`],
  [_colors.dragon, `"I'm just a slave, a weapon.  I value revenge over loyalty.  I'm the last dragon left, and I swore to\ndestroy the ice kingdom. 
 That's why I was there."`],
  [_colors.dragon, `"I tried to serve my purpose there, get more power, and eventually accomplish my goal.\nI never looked up to Ignathor at all, I only saw and sought my revenge."`],
  [_colors.dragon, `"But there's something more to you than ever he was.  I don't know why, but I feel comfort in\nthe first time being with you ever since the ice kingdom attacked."`],
  [_colors.dragon, `"It feels like peace, before I knew what war was."`],
  [_colors.player, `"Howabout we go and unite the other realms to defeat the ice kingdom?", you ask.  \n"I don't remember what realm I came from, but I remember the ice kingdom destroying everything I knew relentlessly."`],
  [_colors.dragon, `"That sounds like a plan.  Let's first warp to the realm of stone."`]
], "Portal")

loadNewLevel(" @                                      \n                                        \n      ß           ß                     \n                                  ß     \n0000000/   R   \\1441/                   \n4444443          24       ß    \\4444/   \n4444443   <44/   \\4             <43     \n44444/\\   24/    <4    <4444/  </23     \n4444/    <4/  4 </4   </ 23   </ 23   R \n4443     23   4</ 4  </  23  </  23     \n4443     23   4/  4 </   23 </   23     \n4443     23  </   4</    23</    23     \n4443     23 </    4/     24/     23     \n444/     23</            23             \n444      24/       R                    \n444      23                             \n443      23  <00000000>                <\n444      23          +4>   ß  ß ß     < \n443      23           44>            <  \n443      2400000000000444000000000000   ", [
  [_colors.env, "A bright light flashes, and you arrive at the kingdom of stone."],
  [_colors.dragon, `"We're here," says the dragon, "Welcome to the kingdom of stone."`],
  [_colors.player, `"Are you sure the ruler of the stone kingdom will approve us killing his soldiers?," you ask.`],
  [_colors.dragon, `"Worry not, like I said, soldiers can be cloned easily across realms."`]
], "Stone")

loadNewLevel(`    RR     :        G    \\4444
 \\1111/  \\111/  \\11114    2444
                     \\3   2444
                      3   \\444
                      3    \\44
                      3     24
                      \\   O 24
              S             24
                    +     : 24
 @                         <44
    GR                    \\444
                   <00/    \\44
\\44444 G         \\0444      24
 \\444/            \\444      24
  24/    \\444/     444      24
  23      244 O  G 444      24
  23      \\444/   <444      24
  23       4/   \\4444/      24
  23       4      \\44       24
  23       4       44       24`, [
  [_colors.dragon, `"Arakonduaith, master of stone, we have come to ask a favor of you,"\nsays the dragon loudly, his voice echoing throughout the cliffs.`],
  [_colors.stoneboss, `"Speak", says Arakonduaith.`],
  [_colors.dragon, `"The realm of ice has been oppressing both the realm of dragons and the realm of fire.\nWe ask that you would help us to destroy them."`],
  [_colors.stoneboss, `"And you think I will help you after you have killed so many of my soldiers?" bellows\nthe large stoney figure, eyes flowing with rage.`],
  [_colors.env, "You can see the dragon's face flush in embarassment"],
  [_colors.dragon, `"We have done what we needed to do to come and see you."`],
  [_colors.stoneboss, `"Leave me," roars the large stone.`],
  [_colors.env, "The dragon stands his ground, and the stone flies upwards, blotting out the sun."],
  [_colors.stoneboss, `"I shall start by destroying your little friend here if it takes that much for you to leave me."`]
], "Stone")

loadNewLevel("4411111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111144\n4/                                                                                                \\4\n4   @                      R                 O                 G                                   4\n4>                                                                                                 4\n4400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000>    4\n4411111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111/    4\n4/                                                                                                 4\n4  +                                   G             O                 R                           4\n4>                                                                                                <4\n4400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044",[
  [_colors.player, `"That was unfortunate," you mutter.`],
  [_colors.dragon, `"I guess what doesn't kill you makes you stronger, but MAN,\nI'm gonna feel the after math of this battle for a while," says the dragon.`],
  [_colors.player, `"You only got shot by like THREE laser beams and I got hit countless times!"`],
  [_colors.dragon, `"The only thing you can do is walk it off I guess."`]
], "Portal");

loadNewLevel("44                 4\n44    π            4\n44                 4\n44                 4\n44   44>           4\n44    \\4>          4\n44     44>         4\n44     4\\4>        4\n44     4 \\4>       4\n44     4  \\4>      4\n44     4 + 44>     4\n44     4   4\\4>    4\n44     4   4 \\4>   4\n44     4   4  \\4>  4\n44     4   4   \\4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4        4  4\n44     4>       4  4\n44     44444    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44         4    4  4\n44     π   4    4  4\n44         4    4  4\n44         4    4  4\n44         4 π  4  4\n44         4       4\n44 @  π  π 4    π  4\n44>        4>     <4\n44444444444444444444",[
  [_colors.player, `"Why do you fly so slowly?"`],
  [_colors.dragon, `"It's hard to fly in a place with minimal gravity and so much air resistance"`],
  [_colors.player, `"Where are we headed now?  The plant realm?"`],
  [_colors.dragon, `"Yup, I really hope we can get them to help us this time."`],
  [_colors.player, `"Let's hope so."`],
  [_colors.dragon, `"Ready to climb it off?"`],
  [_colors.player, `"Wait what?  Are you serious?  You have got to be joking.\nI think you chose the longest path outside the universe to walk in."`]
], "Forest");

loadNewLevel(`                              
3            π P             2
3                            2
3           444444           2
3      π    4    4     π     2
3                            2
3  4444444          4444444  2
3         π                  2
3                   π        2
3            >  <            2
3            4  4            2
3            4  4            2
3 π          4  4            2
3    O       4RR4       O  π 2
3        @   4  4            2
3    4       4 +4       4    2
3    4       4  4       4    2
\\>  <4>     <4RR4>     <4>  <\/
 \\00040000000400400000004000\/ `, [
  [_colors.plantboss, `"Why have you entered this realm?," asks the ruler of the plant realm, a giant cactus.`],
  [_colors.dragon, `"Will you help us to defeat and destroy the realm of ice?" returns the dragon.`],
  [_colors.plantboss, `"This has nothing to do with me," shouts the giant cactus.`],
  [_colors.env, `The cactus shoots out a ton of spikes at the dragon.`],
  [_colors.dragon, `*loud roaring and lots of painful noises*`],
  [_colors.player, `"What was that for?  Don't hurt him!" you shout,\nonly to get a bunch of spikes thrown in your direction.`],
  [_colors.env, `A large beam of fire explodes out of the dragon's mouth, striking the cactus in the face.`]
 ], "Forest")

loadNewLevel("@           3:      \n            3:      \n            3  :    \n               2    \n              :2    \n               2    \n        OGGG:       \n       O<0000       \n  RRRRO<          + \n0000000             ", [
  [_colors.dragon, `"Cactus spines really hurt", says the dragon`],
  [_colors.player, `"Good", you reply. "Let's warp to the ice kingdom now."`],
  [_colors.dragon, `"I need to pull out some cactus spines from me first."`],
  [_colors.player, `"Same here"`],
  [_colors.env, "One hour later"],
  [_colors.dragon, `"Time to go.  Let's do this," the dragon says, his voice full of wrath.`],
  [_colors.env, "A flash of light pulses, once more you and the dragon are outside the universe."]
], "Portal")

loadNewLevel("                                             \\4444\n @   <00000>                                  \\444\n    <4444443 î î î  <00000>    <000>           \\44\n000044/  \\43        2444443    2444400000>      \\4\n4/        \\3        2441114>   \\4444441111>      2\n3 îîî      3        24/   \\4>   \\4441/    \\>     2\n3          \\000000004/     \\4>   \\1/   î   2>    2\n3                           \\4>            23    2\n4>                           \\4>     î  î  23    2\n44000000000>     <0000000>    \\4>         <43    2\n441111111144>  <0411111111>    \\400000000044/    2\n4/        \\43  24/        \\>                     2\n3          23  23          \\>     î             <4\n3       î  23  23      î    \\>        î  î     <44\n3  î       23  23            \\>               <444\n3     4    23  23   î         \\>             <4444\n3     4    23  23              \\000000000000044444\n3     4    23  23                              \\44\n3  î  4    \\3  2/                               \\4\n3     4                 î                        2\n3     4           î              <00000000000>   2\n3     4                         <1111111111443   2\n4>   <4>                       </          \\43   2\n4400044400000000000000000000000/            23   2\n4/                                          23   2\n3                                           \\3   2\n3 +           î   î   î   î   î                  2\n3                                                2\n4>                                               2\n44000000000000000000000000000000000000000000000004",[
  [_colors.dragon, `"We're here", says the dragon`],
  [_colors.player, `"I remember their defenses and army extremely strong when they captured me", you say.`],
  [_colors.dragon, `"I sure remember that!!"`],
  [_colors.player, `"Try to save your fire, we'll need a lot of it for defeating the ruler of this land."`],
  [_colors.dragon, `"Got it, let's do this."`]
], "Ice")

loadNewLevel(`3                                      2
3                                      2
3      :                        :      2
3                                      2
3   <0000>   <000>  <0000>   <00000>   2
3   \\1111/   \\111/  \\1111/   \\11111/   2
3                                      2
3                                      2
3                  I           :       2
3       :                              2
3                          <0000000>   2
3                          \\4444444/   2
3   <000000>        @       \\11111/    2
3   \\444444/        :                  2
3    \\1111/                   î   î    2
3   î  î                               2
3              <00000000>    +         2
3             <4444444444>             2
3            <444444444444>            2
4000000000000444444444444440000000000004`, [
  [_colors.iceboss, `"Ah, the last surviving dragon who has attempted to\npenetrate my forces", says the large icy entity,`],
  [_colors.iceboss, `"Let's keep this short and just kill you."`]
], "Ice")

loadNewLevel("@\n+", [
  [_colors.player, `"We did it!  The Ice boss is dead!", you shout in excitement and triumph.`],
  [_colors.env, `The dragon nods his head.  He doesn't seem to be as joyous as you.`],
  [_colors.player, `"Tell me you aren't sad for having killed your greatest enemy", you say in response to the dragon's expression.`],
  [_colors.dragon, `"I looked into the eyes of one of his soldiers before I killed him.\nThat expression of fear brings back a memory I had when the ice kingdom attacked us.",\nresponds the dragon.`],
  [_colors.dragon, `"It made me feel, in a way, guilty.  Have we done the same thing\nto so many elemental kingdoms as the ice kingdom has done?"`],
  [_colors.dragon, `"I feel accomplished having killed him, but also filthy at the same time for having killed heartlessly so much."`],
  [_colors.dragon, `"Is revenge really the way to seek joy?"`],
  [_colors.env, `You both pause and look into the distance for a moment.`],
  [_colors.player, `"We can do one thing," you say.`],
  [_colors.dragon, `"What's that?"`],
  [_colors.player, `"We can prevent further conflict between realms, and unite them.\nThere won't be any more war if we can do that."`],
  [_colors.player, `"Besides, there are no more elemental bosses to get in our way."`],
  [_colors.dragon, `"That sounds like a plan.  Let's recover from our wounds,\nand then get started after that."`],
  [_colors.white, `---`],
  [_colors.white, `Built by Dainfloop, bddy, and IroncladDev for a surprise conclusion for Kajam.`],
  [_colors.white, `Thanks for playing!!`]
], "Portal")