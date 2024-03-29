import { TypeAnimation } from "react-type-animation";

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
      <div className="flex-col items-center justify-center">
        <div className="p2">
          <TypeAnimation
            style={{ whiteSpace: "pre-line" }}
            sequence={[
              `Hello, and thank you for your interest in this research.
            This research is being conducted as part of a dissertation project.
            The project is a requirement for being awarded a master's degree in Computer Science at the University of Northumbria.
            This research will be overseen by the Computer and Information Sciences department.
            Participation in the study is entirely voluntary and can be withdrawn at any time.
            Before deciding whether to take part, it is important for you to understand what the study involves.
    
            Please take the time to read the information on the next page carefully.`,
              1000,
            ]}
            repeat={1}
          />
        </div>
        <div>
          <button className="pt-5 hidden">Next</button>
        </div>
      </div>
    </div>

    //   <div className="w-1/2">
    //     <p>Hello, and thank you for your interest in this research.</p>
    //     <p>
    //       This research is being conducted as part of the dissertation project
    //       requried to be awarded a master's degree in Computer Science at the
    //       University of Northumbria.
    //     </p>
    //     <p>
    //       This research will be overseen by the Computer and Information
    //       Sciences department.
    //     </p>
    //     <p>
    //       Participation in the study is entirely voluntary and can be withdrawn
    //       at any time.
    //     </p>
    //     <p>
    //       Before deciding whether to take part, it is important for you to
    //       understand what the study involves.
    //     </p>
    //     <p>
    //       Please take the time to read the information on the next page
    //       carefully.
    //     </p>
    //   </div>
  );
}

export default HomePage;
