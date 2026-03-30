# Annotated bibliography

A curated reference list for the `/research` folder, organised by domain.
Annotations explain relevance to digital interface design specifically.

---

## Foundational trauma-informed care

**SAMHSA. (2014). *SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach.* HHS Publication No. (SMA) 14-4884.**  
The foundational policy document. Defines the six principles (Safety, Trustworthiness & Transparency, Peer Support, Collaboration & Mutuality, Empowerment/Voice/Choice, Cultural/Historical/Gender Issues) that structure this library. Not originally written for digital design, but directly mappable to UI decisions — see `guidelines/samhsa-to-ui.md`.

**Harris, M. & Fallot, R. D. (2001). *Using Trauma Theory to Design Service Systems.* New Directions for Mental Health Services, 89.**  
Early application of trauma principles to system design. Argues that trauma-informed practice is systemic, not just individual — relevant to the critique of "trauma-washing" in this library's honest-critique document.

---

## Trauma-informed computing (peer-reviewed)

**Chen, J. X., McDonald, A., Zou, Y., et al. (2022). "Trauma-Informed Computing: Towards Safer Technology Experiences for All." *Proceedings of CHI '22.* ACM. https://dl.acm.org/doi/10.1145/3491102.3517475**  
⭐ The foundational academic paper for this field. Extends SAMHSA's six principles across four computing domains: UX design, security and privacy, AI/ML, and organisational culture. Essential reading before contributing to this library.

**Eggleston, M. & Noel, L.-A. (2024). "Trauma-Informed Design: Leveraging Usability Heuristics on a Social Services Website." *Journal of Usability Studies*, 19(3), 123–138. https://uxpajournal.org/trauma-informed-design-leveraging-usability-heuristics-on-a-social-services-website/**  
Demonstrates that SAMHSA's TI principles overlap substantially with Nielsen's usability heuristics. This is a critical insight: trauma-informed design is not a separate methodology — it is UX best practice applied with intentionality toward traumatised users. Directly informs the component rationales in this library.

**Eggleston, M., Jones, E. P., Khan, N., et al. (2025). "A Scoping Review of Trauma-Informed Care Principles Applied in Design and Technology." *Digital Health*, 11. SAGE. https://journals.sagepub.com/doi/10.1177/20552076251360925**  
Reviewed 118 digital health interventions. Found that 99% did not explicitly reference a TI framework despite working with trauma-affected populations. Documents the gap this library fills.

**Scott, C. F., Marcu, G., Anderson, R. E., et al. (2023). "Trauma-Informed Social Media: Towards Solutions for Reducing and Healing Online Harm." *Proceedings of CHI '23.* ACM.**  
Extends TI principles to social media contexts — relevant to anyone building community or social features with this library.

**Venkatasubramanian, K., et al. (2025). "Considering Trauma in Accessible Design for Adults with Intellectual and Developmental Disabilities." *Communications of the ACM.*  https://cacm.acm.org/research/considering-trauma-in-accessible-design/**  
Bridges trauma-informed design and disability accessibility — two frameworks that overlap more than either field typically acknowledges.

**ACM CHI 2023. "Click Here to Exit: An Evaluation of Quick Exit Buttons." https://dl.acm.org/doi/10.1145/3544548.3581078**  
Empirical study of 2,045 domestic violence support websites. Found SafeExit buttons present on 80.3% but with wide variation in implementation quality. Directly informs the `<SafeExit>` component specification.

---

## Neuroscience and body-based theory

**Porges, S. W. (2011). *The Polyvagal Theory.* W.W. Norton.**  
The primary theoretical source for nervous system framing in this library. Note the scientific controversy documented in `research/honest-critique.md`.

**Dana, D. (2018). *The Polyvagal Theory in Therapy.* W.W. Norton.**  
More accessible clinical translation of polyvagal theory. More useful for designers than Porges' original.

**Siegel, D. J. (1999). *The Developing Mind.* Guilford Press.**  
Source of the "window of tolerance" model — the most directly applicable neuroscience concept to UI design. Interfaces should keep users in their optimal zone of arousal, avoiding both hyperarousal (overwhelm) and hypoarousal (helplessness).

**van der Kolk, B. (2014). *The Body Keeps the Score.* Viking.**  
Landmark clinical text on trauma's somatic dimension. Grounds the argument that interface design — which mediates bodily interaction with digital environments — has physiological stakes.

**Yoto, A., et al. (2007). "Effects of object color stimuli on human brain activities..." *Journal of Physiological Anthropology*, 26(3), 373–379.**  
One of several studies supporting the use of muted/cool-warm palettes over high-saturation palettes in stress-reduction contexts. Grounds the colour token decisions in this library.

---

## Care ethics

**Noddings, N. (1984). *Caring: A Feminine Approach to Ethics and Moral Education.* UC Press.**  
Foundational text. Argues that ethics is grounded in relationships of care rather than abstract principles. Relevant to the critique of conversion-optimised design.

**Tronto, J. C. (1993). *Moral Boundaries: A Political Argument for an Ethic of Care.* Routledge.**  
Extends care ethics from the interpersonal to the political. Tronto's five phases of care (attentiveness, responsibility, competence, responsiveness, solidarity) map directly to design process.

**Held, V. (2006). *The Ethics of Care: Personal, Political, and Global.* Oxford UP.**  
Systematic treatment of care ethics as a comprehensive moral framework. Most useful for the critique of market logics in product design.

**The Care Collective. (2020). *The Care Manifesto.* Verso.**  
Contemporary political argument for "promiscuous care" — care that extends beyond the personal to the collective and structural. Relevant to the organisational layer of Care-Conscious Design.

**Manders-Huits, N. & van den Hoven, J. (2023). "Designing for Care." *Science and Engineering Ethics.* https://link.springer.com/article/10.1007/s11948-023-00434-4**  
Proposes "Designing for Care" as a distinctive technological design approach. Peer-reviewed bridge between care ethics and engineering practice.

---

## Design justice and feminist HCI

**Costanza-Chock, S. (2020). *Design Justice.* MIT Press. [Open access]**  
Essential. Argues that design reproduces systems of oppression and must be restructured to centre marginalised communities in the design process. The theoretical underpinning for the cultural/intersectional dimension of this library.

**Bardzell, S. (2010). "Feminist HCI: Taking Stock and Outlining an Agenda for Design." *Proceedings of CHI '10*, 1301–1310.**  
Proposed six feminist HCI qualities: pluralism, participation, advocacy, embodiment, ecology, self-disclosure. Widely cited, rarely implemented — this library takes self-disclosure (acknowledging whose values and assumptions are embedded in design) seriously through its honest-critique document.

**Benjamin, R. (2019). *Race After Technology.* Polity.**  
Documents how "neutral" technical systems encode racial discrimination. Essential context for the care worker UX work and the racial trauma gap acknowledged in this library.

**Noble, S. U. (2018). *Algorithms of Oppression.* NYU Press.**  
Demonstrates how search algorithms and recommendation systems reproduce racial bias. Grounds the critique that design "neutrality" is a myth.

---

## Practitioner books

**PenzeyMoog, E. (2021). *Design for Safety.* A Book Apart.**  
The essential practitioner text on designing against technology-facilitated intimate partner violence. Required reading for anyone using `<SafeExit>` or designing in domestic abuse contexts.

**Meyer, E. & Wachter-Boettcher, S. (2016). *Design for Real Life.* A Book Apart.**  
Introduced "stress cases" as the design equivalent of edge cases — moments of real difficulty that reveal a design's values. Predates the TI design literature but directly relevant.

**Wachter-Boettcher, S. (2017). *Technically Wrong.* W.W. Norton.**  
Documents the human cost of bad product design decisions made by homogeneous teams. Complements Benjamin and Noble.

**Holmes, K. (2018). *Mismatch: How Inclusion Shapes Design.* MIT Press.**  
The "persona spectrum" framework — understanding disability and exclusion as a spectrum from permanent to situational — maps directly to trauma: trauma can be permanent (C-PTSD), temporary (acute crisis), or situational (stressful life event).

---

## Key practitioner articles and resources

**Decker, E. (2021). "To Build Gentler Technology, Practice Trauma-Informed Design." Medium/Care+Code. https://medium.com/care-code/to-build-gentler-technology-practice-trauma-informed-design-3b4ad34a9f0b**  
The most widely referenced practitioner article. Maps SAMHSA's six principles to specific product design decisions. Direct precursor to this library.

**Chayn. (2023). *Trauma-Informed Design Whitepaper.* https://blog.chayn.co**  
Eight principles developed through years of building digital tools for gender-based violence survivors. The most practice-grounded document in the field.

**GSA 10x Program. "Trauma-informed design." https://10x.gsa.gov/news/trauma-informed-design/**  
Documents the U.S. federal government's investment in TI design for civic tech. Demonstrates institutional adoption.

**Every, K. (2023). "Applying trauma-informed principles to user-centred design." Medium/ResearchOps Community.**  
Practitioner article applying TI principles to UX research specifically — relevant to the research practices that should precede any use of this library.

**Design Patterns for Mental Health. https://designpatternsformentalhealth.org**  
Pattern library created by Snook, PublicPolicyLab, and Barnardo's. Documents interaction patterns including escape buttons and access points. No code is shipped — this library provides the React implementation.

**GOV.UK Design System. "Exit this page" component. https://design-system.service.gov.uk**  
Production implementation of the SafeExit pattern in the UK government design system. Vanilla JS, not React — this library provides the React equivalent.

**Content Design London. (2024). "Using trauma-informed principles in content design." https://contentdesign.london/blog/using-trauma-informed-principles-with-content-design**  
Applies TI principles to UX writing specifically. Supplements `guidelines/ux-writing.md` in this library.

---

*Maintained by Luana Micheau / Care-Conscious Design*  
*Last updated: March 2026*
