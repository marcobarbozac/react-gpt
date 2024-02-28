import { FormEvent, useState } from "react";


interface Props {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
}


export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections }: Props) => {
  
    const [message, setMessage] = useState("");


    const handleSendMessage = ( event: FormEvent<HTMLFormElement> ) => {

        event.preventDefault();

        if ( message.trim().length === 0 ) return;

        onSendMessage( message );

        setMessage('');
        
    }
  
  
    return (
        <form 
          onSubmit={ handleSendMessage } 
          className="h-16 w-full bg-white rounded-xl px-4 flex flex-row items-center">

            <div className="flex-grow">
                <div className="relative w-full">
                    <input 
                        type="text"
                        autoFocus
                        name="message"
                        className="flex w-full rounded-xl text-gray-800 focus:outline-none border focus:border-indigo-300 p-4 h-10" 
                        placeholder={ placeholder }
                        autoComplete={ disableCorrections ? 'on' : 'off' }
                        autoCorrect={ disableCorrections ? 'on' : 'off' }
                        spellCheck={ disableCorrections ? 'true' : 'false' }
                        value={ message }
                        onChange={ e => setMessage( e.target.value ) } />
                </div>
            </div>

            <div className="ml-4">
                <button className="btn-primary">
                    <span className="mr-2" >Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>

        </form>
    )
}
