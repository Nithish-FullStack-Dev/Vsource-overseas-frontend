
// import * as view360 from "/360/index.html"
const View360 = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/360/index.html"
        title="360 View"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default View360;
