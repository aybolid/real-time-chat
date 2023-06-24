import ChatList from '../components/routes/Home/ChatList';
import SectionWrapper from '../components/elements/SectionWrapper';

export default function Home() {
  return (
    <SectionWrapper>
      <div className="glass grid h-full w-full grid-cols-3 grid-rows-1 gap-6 rounded-md bg-white p-4 shadow-md">
        <ChatList />
        <div className="col-span-2 rounded-md bg-sky-400 shadow-md"></div>
      </div>
    </SectionWrapper>
  );
}
