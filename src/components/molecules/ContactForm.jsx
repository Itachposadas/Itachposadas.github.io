import { useState, useRef, useMemo } from "react";

function Label(props) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {props.children}
    </label>
  );
}

function Input(props, ...rest) {
  return (
    <input
      type={props.type || "text"}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                 bg-white text-gray-900
                 placeholder-gray-400
                 focus:border-red-500 focus:ring-2 focus:ring-red-500
                 transition-all duration-300 outline-none"
      placeholder={props.placeholder || ""}
      ref={props.innerRef}
      {...rest}
    />
  );
}

function TextArea(props, ...rest) {
  return (
    <textarea
      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                 bg-white text-gray-900
                 placeholder-gray-400
                 focus:border-red-500 focus:ring-2 focus:ring-red-400
                 transition-all duration-300 outline-none resize-none"
      placeholder={props.placeholder || ""}
      rows={props.rows || 4}
      ref={props.innerRef}
      {...rest}
    />
  );
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const SubmitButton = useMemo(() => {
    if (loading) {
      return (
        <button className="w-full py-3 bg-blue-400 text-white rounded-lg">
          {loading ? "Seding.."  : "Send"}
        </button>
      );
    }

    return (
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg
                   hover:bg-blue-900
                   transition-all duration-300 shadow-md"
      >
        Enviar mensaje
      </button>
    );
  }, [loading]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Contáctame</h2>
        <p className="text-gray-600 mt-2">
          ¿Tienes alguna pregunta o proyecto en mente? ¡Me gustaría leerte!
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);

          setTimeout(() => {
            setLoading(false);

            
            if (nameRef.current) nameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (messageRef.current) messageRef.current.value = "";
          }, 2000);
        }}
      >
        <div>
          <Label>Name</Label>
          <Input placeholder="Tu nombre" useRef={nameRef} />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Tu correo electrónico" useRef={emailRef} />
        </div>

        <div>
          <Label>Message</Label>
          <TextArea placeholder="Escribe tu mensaje aquí..." rows={6} useRef={messageRef} />
        </div>

        {SubmitButton}
      </form>
    </div>
  );
}