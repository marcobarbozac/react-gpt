import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { ProsConsStreamUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}



export const ProsConsStreamPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
    

  const handlePost = async( text: string) => {

    setIsLoading(true);
    setMessages( prev => [ ...prev, { text: text, isGpt: false } ]);

    const reader = await ProsConsStreamUseCase( text );

    setIsLoading(false);
    
    if ( !reader ) return alert('No se pudo generar en reader');

    const decoder = new TextDecoder();

    let message = '';

    setMessages( messages => [ ...messages, { text: message, isGpt: true } ]);

    while( true ) {

      const { value, done } = await reader.read();

      if ( done ) break;

      const decodedChunk = decoder.decode(value, { stream: true });

      message += decodedChunk;

      setMessages( messages => { 
        const newMessages = [ ...messages ];

        newMessages[ newMessages.length - 1 ].text = message;

        return newMessages

      });    
    }
  }

  return (
    <div className="chat-container" >

      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          
          <GptMessage text="¿Qué quieres que te compare?" />
          
          { 
            messages.map( ( message, index ) => (
              message.isGpt 
                ? ( <GptMessage key={ index } text={ message.text } /> )
                : ( <MyMessage key={ index } text={ message.text }/> )
            ) )
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>

      <TextMessageBox 
        onSendMessage={ handlePost } 
        placeholder="Escribe aquí lo que quieras"
        disableCorrections={ true }/>

    </div>
  )
}
