import {Model} from 'xorm';

class Suggestion extends Model {
	static softDelete = true;

	static jsonSchema = {
		type: 'object',
		properties: {
			title: {type: 'string', required: true, minLength: 1},
		},
	};

	static async saveSuggestion(ctx) {
		const $body = ctx.request.body;
		const suggestion = {
			userId: $body.userId,
			title: $body.title,
			suggestion: $body.suggestion,
		};

		try {
			const savedSuggestion = await Suggestion.saveAndFetch(suggestion);
			if (savedSuggestion) ctx.body = 'success';
			else 'failed';
		}
		catch (err) {
			ctx.body = err.message;
		}
	}
}

export default Suggestion;