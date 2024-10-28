import classNames from 'classnames';
import React, {useCallback, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import { GlobeCheckedIcon } from '@mattermost/compass-icons/components';

import useDidUpdate from 'components/common/hooks/useDidUpdate';

import KeyboardShortcutSequence, {KEYBOARD_SHORTCUTS} from 'components/keyboard_shortcuts/keyboard_shortcuts_sequence';
import WithTooltip from 'components/with_tooltip';

import type {PostDraft} from 'types/store/draft';
import {IconContainer} from './formatting_bar/formatting_icon';

const useTranslateButton = (
    readOnlyChannel: boolean,
    draft: PostDraft,
    handleDraftChange: (draft: PostDraft) => void,
    shouldShowPreview: boolean,
    focusTextbox: () => void,
) => {
    const intl = useIntl();

    const translateButtonRef = useRef<HTMLButtonElement>(null);

    const [showTranslatePopup, setShowTranslatePopup] = useState(false);

    const toggleTranslatePopup = useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e?.stopPropagation();
        setShowTranslatePopup((prev) => !prev);
    }, []);

    const hideTranslatePopup = useCallback(() => {
        setShowTranslatePopup(false);
    }, []);

    const getTranslateButtonRef = useCallback(() => {
        return translateButtonRef.current;
    }, []);

    const handleTranslateClick = useCallback(() => {
        const message = draft.message;
        handleDraftChange({
            ...draft,
            message: `${message} (translated)`,
        });

        setShowTranslatePopup(false);
    }, [draft, handleDraftChange]);

    // Focus textbox when the translate button closes
    useDidUpdate(() => {
        if (!showTranslatePopup) {
            focusTextbox();
        }
    }, [showTranslatePopup]);

    let translateButton = null;

    if (!readOnlyChannel) {
        translateButton = (
            <>
                <WithTooltip
                    id='translate-tooltip'
                    placement='top'
                    title={
                        <KeyboardShortcutSequence
                            shortcut={KEYBOARD_SHORTCUTS.msgTranslate}
                            hoistDescription={true}
                            isInsideTooltip={true}
                        />
                    }
                >
                    <IconContainer
                        id={'translateButton'}
                        ref={translateButtonRef}
                        onClick={handleTranslateClick}
                        type='button'
                        aria-label={intl.formatMessage({id: 'translate.button.ariaLabel', defaultMessage: 'translate message'})}
                        disabled={shouldShowPreview}
                        className={classNames({active: showTranslatePopup})}
                    >
                        <GlobeCheckedIcon/>
                    </IconContainer>
                </WithTooltip>
            </>
        );
    }

    return {translateButton, toggleTranslatePopup, hideTranslatePopup, getTranslateButtonRef};
};

export default useTranslateButton;
