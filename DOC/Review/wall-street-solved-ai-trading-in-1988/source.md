Wall Street Solved AI Trading in 1988. You're 37 Years Late.

The machine-learning revolution everyone thinks is brand new was already running a hedge fund before most of us were born. And the people who built it went on to build the AI you use today.

There is a gold rush happening right now. Everywhere you look, someone is selling you the same dream: point an AI at the market, let it learn, and watch it print money while you sleep. It feels new. It feels like you are early to something enormous.

I want to gently take that feeling away, because the truth is more useful, and honestly, more freeing.

The thing you think you are early to was solved in 1988. Not sketched, not theorized, solved, in a quiet office on Long Island, by a former codebreaker and a small group of mathematicians who were doing machine learning decades before the phrase meant anything to anyone. You are not at the front of this wave. You are showing up almost forty years after the people who actually cracked it. And once you understand who they were and what they did, being "late" stops looking like a problem at all.

Let me walk you through it.

What Actually Happened in 1988

In 1988, a mathematician named Jim Simons launched a fund called Medallion inside his firm, Renaissance Technologies. Simons was not a Wall Street man. He was a geometer good enough to have a theorem named after him, and before that a codebreaker for the American government during the Cold War, pulling signals out of enemy noise.

What he built at Medallion is the best track record in the history of markets. Roughly 66% a year before fees, from 1988 to 2018. Thirty years, and not a single losing one. No trader relying on gut, no famous stock picker, nobody you have heard give a TED talk has ever come close.

And here is the part that matters for you. He did not do it with intuition, or insider access, or a secret indicator. He did it with machine learning, at a time when almost nobody on Wall Street even knew what that was. The market, to Simons and his team, was not a story about companies. It was a giant, noisy dataset with faint, repeating patterns buried inside, exactly the kind of signal a codebreaker is trained to find.

Where the "AI" Actually Came From

The mathematical heart of the early fund came from a man named Leonard Baum, one of Simons' old codebreaking colleagues.

Baum is not famous, and he should be. He co-invented something called the Baum-Welch algorithm, a method for teaching a machine to uncover a hidden pattern it cannot see directly, only guess at from the evidence it leaves behind. The technical name for the thing it uncovers is a hidden Markov model. Do not let the words scare you. The idea is simple and beautiful: the world flips between hidden states, calm and panic, trend and chop, and all you ever get to see is the noisy output. Baum's math works backwards from the noise to the hidden state.

Now here is the detail almost nobody connects. That exact algorithm, Baum-Welch on hidden Markov models, is the same math that taught computers to recognize human speech. When your phone turns your voice into text, it is standing on Leonard Baum's shoulders. Simons simply asked a different question. Instead of "what word is hidden under this sound," he asked "what state is hidden under this price." Same machinery. Different data.

That is what "AI trading" was, in 1988. Not a robot with opinions. A pattern-finder, borrowed from the science of speech, pointed at the market.

The Plot Twist That Should Change How You See This

In 1993, Simons did something that ties this whole story into a knot you cannot un-see.

He walked into IBM's research lab and hired two men, Robert Mercer and Peter Brown. At IBM, Mercer and Brown were part of a legendary group, led by Frederick Jelinek, that had spent years teaching machines to understand and translate human language using pure statistics instead of grammar rules. They pioneered the statistical approach to machine translation. If you trace the family tree of the AI you use today, of Google Translate, of the language models behind every chatbot, you land squarely on the work these men were doing at IBM in the eighties.

Simons doubled their salaries and set them loose on the market. Mercer and Brown later ran Renaissance together.

Sit with that for a second. The people who helped invent the direct ancestor of ChatGPT did not spend the nineties dreaming about the future of AI. They spent it quietly using that same technology to trade. The founders of modern language AI were AI traders thirty years ago. The thing being sold to you as the frontier of 2025 was, for them, a day job in 1995.

So when a thread promises you an "AI that reads the market," understand what you are really looking at: a faint, retail-grade echo of something the smartest people in the field were already doing before the euphemism "AI" was even fashionable.

So What Is "AI Trading," Really?

Let me demystify it completely, because the mystery is where people get robbed.

An AI trading model is not a crystal ball and it does not predict the future. What it actually does is humble: it looks across an enormous amount of data, thousands of inputs at once, and learns the expected outcome given what it sees. It is the same species of tool as a spam filter or a speech recognizer. It finds patterns, weighs them, and combines a crowd of individually weak signals into one slightly-better-than-random guess.

That is the whole trick, and it was always the whole trick. Renaissance did not find one golden signal. They found thousands of tiny ones, each barely better than a coin flip, and combined them with enough discipline and enough scale that the tiny edges added up to the greatest fortune in the history of finance. The math for doing that, from Baum's hidden states to the statistical learning Mercer and Brown carried over, has been understood for decades.

Why Being "Late" Is Not the Problem You Think

Here is where the good news lives.

If the technology was the moat, you would be hopelessly locked out, because you showed up thirty-seven years late. But the technology was never the moat, and it is even less of one today. The algorithms are free. You can download a machine-learning library tonight that is more powerful than anything Renaissance had in 1988. The gap between you and them was never the model.

The gap was three things they had and most people still do not: clean data nobody else could get, execution fast enough to act on a fleeting signal before it vanished, and, above all, the discipline to trust the system across thousands of trades without flinching.

And notice, two of those three have quietly opened up. Data and computing power that used to cost a fortune are now cheap or free. That is the real reason people feel like something new is happening. It is not that AI arrived. It is that the price of admission dropped. The one thing that has not gotten any cheaper is the discipline, and that is the one that was always doing the heavy lifting.

Why 99% of AI Trading Bots Still Fail

If it is all so available, why does almost every retail AI strategy end in a blown account?

One word: overfitting. This is the trap that swallows nearly everyone, and it is worth understanding deeply. A machine-learning model is so good at finding patterns that it will happily find patterns that are not real, coincidences in your historical data that will never repeat. It hands you a backtest that looks like a rocket to the moon, and the moment you trade it with real money, the magic evaporates, because it memorized the past instead of learning anything true about the future.

Renaissance's genius was not that they avoided this by being smarter. It was that they were paranoid about it, building years of defenses, brutal statistical tests, and a culture of doubt around the exact question of whether a signal was real or a ghost. The researcher Marcos Lopez de Prado has spent a career warning that most published trading strategies are just overfitting in a nice suit, and that separating a real edge from a lucky backtest is the actual job. The model is the easy part. Knowing whether to believe it is the whole game.

That is why you can have the same tools Renaissance had, and still lose. The bot is not the edge. Your honesty about the bot is.

What Is Genuinely New in 2025

I do not want to pretend nothing has changed, because that would be its own kind of dishonesty.

Two things are genuinely newer. Large language models can now read a mountain of text, every earnings call, every filing, every news wire, faster than any human desk, and turn language into a tradeable signal. And reinforcement learning, the same family of methods that taught a machine to beat the world champion at Go, is now used to learn things like how to execute a big order without moving the market against yourself.

These are real, and they matter at the margin. But look closely and you will see the same old bones underneath. The language models are the great-grandchildren of exactly the statistical translation work Mercer and Brown did at IBM before they ever traded a share. Reinforcement learning still lives or dies on whether the edge it learned survives outside the training data. The tools got sharper. The trap did not move an inch.

The Part Worth Keeping

Go back to the year with me. 1988. Almost four decades ago, a codebreaker and his friends solved the thing you are being told is the frontier. They used the ancestors of the very AI in your pocket. They got unimaginably rich. And none of it was the technology, because the technology spread to everyone and the fortune did not.

So no, you are not early to AI trading. You are thirty-seven years late, and it does not matter even slightly, because the people who were early proved that early was never the point. The moat was never the machine. It was the data, the patience, and the ruthless honesty to tell a real signal from a flattering illusion. Those were the edge in 1988, and with the algorithms now free and the computers now cheap, they are almost the only edge left.

The market is not waiting to be cracked by a cleverer robot. It was cracked a long time ago, by people who understood that the robot was never the answer.

Here is the question I would love you to sit with. If a group of mathematicians solved machine trading in 1988 with tools you can now download for free, and the fortune still came down to their discipline and not their code, then the thing standing between you and this is not access, and it never was. So what would actually change if you stopped hunting for a smarter model, and started building the one thing they had that no one can give you?
