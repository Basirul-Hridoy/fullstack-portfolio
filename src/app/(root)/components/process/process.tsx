import SectionHeading from "../shared/section-heading";
import { ProcessStep } from "./process-step";

type Step={number:string;title:string;description:string};
const Process = ({ steps }: { steps: Step[] }) => <section id="process" className="section-divider py-20"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><SectionHeading eyebrow="My Working Process" title={<>Simple Steps, <span className="gradient-text">Big Results</span></>} description="A clear and strategic process designed to keep campaigns focused, measurable, and aligned with your business goals."/><div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">{steps.map((step, i)=><ProcessStep key={step.number} {...step} last={i===steps.length-1}/>)}</div></div></section>;
export default Process;
