// item
import React, {useEffect, useState} from 'react';
type Props = {
    input?: string;
    output?: string;
    actions: {
        translate: (input: string) => void;
    }
}

const TranslateButton = ({
    input,
    output,
    actions,
}: Props) => {
    const [inputText, setInputText] = useState(input || '');

    const handleTranslate = () => {
        actions.translate(inputText);
    }

    return (
        <div>
            <button onClick={handleTranslate}>Translate</button>
        </div>
    );
}

export default TranslateButton;



