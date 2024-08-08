import React from "react";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full my-5 bg-[#779556] p-3 rounded cursor-pointer"
    >
      <p className="text-center">{children}</p>
    </div>
  );
};

export default Button;
