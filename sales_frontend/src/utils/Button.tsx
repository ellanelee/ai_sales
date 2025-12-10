import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyle = "px-4 py-2 rounded font-semibold transition"
  let variantStyle = ""

  if (variant === "danger") {
    variantStyle = "bg-red-600 text-white hover:bg-red-700"
  } else {
    variantStyle = "bg-blue-600 text-white hover:bg-blue-700"
  }

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  )
}

export default Button
