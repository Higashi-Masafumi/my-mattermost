import {connect} from 'react-redux';
import TranslateBox from './translatebutton';
import { Dispatch } from 'redux';

type OwnProps = {
    input?: string;
    source_language?: string;
    output?: string;
    target_language?: string;
}

function mapStateToProps(ownProps: OwnProps) {
    const {input, source_language, output, target_language} = ownProps;
    return {
        input,
        source_language,
        output,
        target_language,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: {
            translate: (input: string, source_language: string, target_language: string) => {
                // dispatch action
                dispatch({
                    type: 'TRANSLATE',
                    input,
                    source_language,
                    target_language,
                });
            },
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslateBox);