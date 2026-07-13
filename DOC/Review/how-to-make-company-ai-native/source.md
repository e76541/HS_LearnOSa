# How to Make a Company AI-Native

This is the full method we use to take companies AI-native. All of it, free.
Most advice on this topic was written for companies with a billion dollars in revenue and a transformation office. This is the version for a 30-to-200 person company in healthcare, insurance, lending, or compliance, including the PE-backed kind where the board wants the value inside the hold period, and where the auditor is a real person with your calendar access.
Read it and run it yourself. Some of you will. Some of you will get to the second climb, look at your calendar, and call someone.
3 warnings first.
S&P Global surveyed a thousand IT and business professionals and watched the share of companies abandoning most of their AI initiatives jump from 17% to 42% in one year, with the average org scrapping 46% of proof-of-concepts before production.
Gartner predicts more than 40% of agentic AI projects get canceled by end of 2027, and names the causes: escalating costs, unclear business value, inadequate risk controls.
MIT's viral GenAI Divide report put pilot failure at 95%; people argue about that methodology, and the direction matches everything else on the table.
The method below exists because of how those failures happen: no baseline, no gates, no governance, no owner.
The ladder, before the climb
Every company we've measured sits on one of five rungs.
Find yours first; the climb only makes sense from where you're standing. Consultancies sell maturity models too, graded by workshop questionnaire. This one grades you by your own Git history.
AI Matury Ladder in 5 Steps
00 · Adopt. You have AI activity and no AI numbers. Engineers experiment, someone pays for licenses, and nobody can say what any of it changed. Most companies live here, including ones that have been "doing AI" for a year. If you can't name your AI adoption rate, you're on this rung.
01 · Accelerate. Individual engineers get fast. DORA's 2025 survey of nearly 5,000 technology professionals found 90% now use AI at work, spending a median two hours a day with it, and the same report finds about 30% of them have little or no trust in what the AI writes. That contradiction is this rung's whole job: standardize the toolchain, add guardrails, and put senior judgment between the model and the merge. A 15-developer company with 15 private AI workflows is standing at the bottom of this rung.
02 · Automate. Delivery itself becomes agentic: tickets turn into reviewed pull requests through a pipeline, and throughput stops depending on typing speed. This is the rung Gartner's 40% cancellation prediction is aimed at, because most teams deploy agents without the risk controls that keep them shippable. The difference between the canceled 40% and the rest is gates, and gates are buildable.
03 · Scale. AI moves into the product your customers pay for. In our verticals this rung has a face: claims intake automation in insurance, document pipelines in lending, prior-auth and denials tooling in healthcare. Carriers that run this rung well report 60-80% FNOL automation within months.
04 · AI-Native. Governed and industrialized. One gateway for every AI call, evals on every change, role-based access, immutable audit logs, cost policy per repo. For our industries this rung is becoming law, not philosophy: the EU AI Act already classes credit scoring and life and health insurance pricing among its high-risk uses, and while Brussels keeps moving the deadlines (high-risk obligations now land December 2027 and August 2028), the direction hasn't moved once. US examiners are reading the same direction.
The climb below takes a mid-market org 12 to 18 months end to end. Almost nobody needs to start at zero or finish at four in year one.
You climb as far as the business case carries you, and each rung pays for the decision about the next.
Climb to 00: measure before you move
Instrument the engineering org before changing anything about it. Velocity, quality, AI adoption, cost per developer. DORA-style metrics; the tooling exists off the shelf. Two rules before your engineers see it. Measure the system, never stack-rank the people; the moment telemetry becomes surveillance, your seniors start polishing resumes and the data goes dark. And define the unit honestly: adoption means AI-attributable work that survives review into main, not seat licenses paid for. The telemetry itself should be metadata-only, read-only, running in your own cloud; anything that wants more access than that is asking for trust it hasn't earned.
Two things happen.
First, your AI adoption number comes back near zero, which surprises every leadership team that just approved an AI budget. Scattered usage doesn't show up in shipped work. And the gap between feeling fast and being fast has now been measured: in a controlled trial, experienced developers using AI believed they'd gotten 20% faster while the clock showed them 19% slower. Sixteen developers, one study, one lesson worth the whole exercise: self-report is not telemetry.
Second, you now own the thing the 95% never had: a before. Without a before, every after is a story your vendor tells you. If you hold a PE mandate, the before is also what your eventual buyer's diligence team will ask for by name.
Two to four weeks. Nothing else works without it.
Climb 00 to 01: make the humans AI-native before the machines
Your engineers already use AI, approved or not; across surveys, half to three-quarters of employees run tools nobody sanctioned. You can't govern what you can't see, and you can't build agentic systems on fifteen private workflows.
So: one standardized toolchain. Shared prompt patterns. Guardrails. Real codebase context wired into the models so they stop hallucinating your architecture. And the rule that makes it safe in regulated code: senior engineers gate every AI-assisted pull request. DORA found more than 80% of developers say AI raised their productivity while three in ten don't trust its output. Both are correct. The gate is how you collect the productivity without inheriting the distrust.
Exit test: adoption near zero to daily in your telemetry, per-developer velocity up, quality flat or better.
Quality dipped? Tighten the gates before climbing further.
Climb 01 to 02: automate delivery, with gates a machine can't sweet-talk
Pick one workflow first, and pick it like an underwriter: it runs daily, follows patterns, forces people to swivel-chair across five systems, and has a cost you can put a number on. In healthcare that's usually the denials queue (62% of hospitals still work denials entirely by hand while 88% of executives rank payer issues top-three). In lending it's the processing stack behind an $11,000-to-$12,600 cost per loan. In compliance it's the review pile that keeps 58% of functions in spreadsheets.
Then rebuild it: a ticket becomes a plan, code, passing tests, and a pull request, produced by an agent inside a sandboxed run. Three design rules separate this from Gartner's canceled 40%:
Deterministic gates. Scripts validate every step before the next starts. "The output looked right" is not a gate; tests, schema checks, and policy checks are.
The agent never touches Git directly. It proposes. The pipeline and the humans dispose.
Shadow before production. Sandbox first, then alongside humans on live work, then supervised production. Log the agent's output, the human's correction, and the context, every run. That log improves the system and later answers an examiner's favorite question: who approved this, and when.
Keep a human on every exception path. In regulated workflows the handoff is the feature.
And watch the bottleneck move: when agents write more, senior review becomes the constraint, and a tired reviewer rubber-stamping at 5pm is how agentic delivery fails quietly. The deterministic gates exist for exactly this reason: scripts pre-verify the mechanical correctness so your seniors spend their attention on judgment, and only judgment.
Our receipt for this rung: a two-person pod, 122 merged pull requests in three months, roughly 90% AI-generated code, about $200 per developer per month in AI spend. PR count alone is a vanity metric, so read it with its context: every one of those PRs passed the client's own senior review, and quality held across the run. Pipeline design did that, not typing speed.
Climb 02 to 03: put AI in the product, with a meter on it
Once delivery is agentic, point the same discipline at what you sell. Retrieval over your domain documents, classification, document automation, agentic features your customers pay for. Insurance carriers doing this well hit 60-80% FNOL automation within months of a disciplined claims deployment; 90% of carriers are piloting GenAI and only 38% get value at scale, and the gap is exactly the rungs skipped below.
One addition at this rung: a model gateway with cost caps per product track. AI features that ship without a meter become the CFO's problem in the second invoice cycle.
Climb 03 to 04: build the control plane before someone builds it for you
The billion-dollar playbooks go quiet here. A regulated mid-market company lives or dies on it. Four pieces:
A model gateway routing every AI call in the company through one choke point, with policy per repo, per model, per dollar. Evals running on every prompt change and model swap, the way CI runs on every commit, because model behavior drifts. Role-based access on who runs what against which data, with immutable logs underneath. And impact mapping that ties AI work to shipped features and business outcomes, so the board reads value instead of activity.
Credit scoring and life and health insurance pricing already sit in the EU's high-risk class, and the compliance calendar only moves in one direction. Meanwhile 74% of compliance teams plan to buy new technology within 12 months and 41% find current AI tools underwhelming. Build the control plane early and your compliance officer sponsors the whole climb instead of taxing it. We've watched that flip happen inside one meeting, because the meeting opened with the audit trail.
The rule that holds the whole ladder up
Go back to the baseline and read the delta after every climb. Cycle time, error rate, manual hours, cost per unit of workflow. Publish the numbers internally, the ugly ones included. If the delta justifies the next rung, climb. If it doesn't, stop, and you found out in weeks instead of years. The 95% happened because nobody was allowed to say stop.
What we do, since you'll ask
Everything above is the method. It doesn't need us.
What we sell is the execution: up-skilling of your existing team, an embedded pod that runs this climb inside it, the telemetry that measures it, and the control plane that makes it auditable.
Your engineers do the climbing and keep the capability; the pod builds alongside them and gets out. Nothing here is outsourcing wearing a methodology.
We work with 30-to-200 person companies in healthcare, insurance, mortgage and lending, and compliance, a good share of them PE-backed.
Rung 00 is free: two to four weeks, telemetry in, baseline and roadmap out, yours to keep either way.
Four companies ran this climb with us this year. The telemetry did the selling, and one expanded five weeks in because the data made the case before we could.
Run the method yourself, or run it with us. Just measure first. The number will embarrass you, and that number is where every real transformation we've shipped began.
P.S. Every step in this method comes from 100+ engagements since 2016, run on 100% referral.
If you run a 30-to-200 person company in healthcare, insurance, lending, or compliance and want the baseline before any pitch, we staff two Step Zeros a month. Two to four weeks, free, and the data is yours whatever you decide. Find us at limestonedigital.com
