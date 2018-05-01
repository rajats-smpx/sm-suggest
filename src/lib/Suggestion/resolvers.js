import {getConnectionResolver} from 'gqutils';
import {Suggestion} from '../models';

export default {
	Query: {
		suggestion: Suggestion.getFindOneResolver(),
		async suggestions(root, args, ctx) {
			const query = Suggestion.query();

			if (args.id) {
				query.where('id', args.id);
			}

			if (args.userId) {
				query.where('userId', args.userId);
			}

			if (args.seen) {
				query.where('seen', args.seen);
			}

			if (args.status) {
				query.where('status', args.status);
			}

			if (args.search) {
				query.where((q) => {
					q.whereIn('id', args.search)
						.orWhere('title', 'like', `%${args.search}%`)
						.orWhere('suggestion', 'like', `%${args.search}%`)
						.orWhere('status', 'like', `%${args.search}%`);
				});
			}

			return getConnectionResolver(query, args);
		},
	},

	Mutation: {
		async saveSuggestion(root, suggestion, ctx) {
			const savedSuggestion = Suggestion.saveAndFetch(suggestion);
			return savedSuggestion;
		},

		deleteSuggestion: Suggestion.getDeleteByIdResolver(),
	},

	Suggestion: {
		user: Suggestion.getRelationResolver('user'),
	},
};
