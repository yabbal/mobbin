import type {
	Collection,
	CollectionsResponse,
	ContentType,
	SavedContentsResponse,
} from "../types.js";
import { Resource } from "./base.js";

export class CollectionsResource extends Resource {
	/**
	 * Fetch user collections
	 */
	list = async (): Promise<Collection[]> => {
		const res = await this.fetch.request<CollectionsResponse>("/api/collection/fetch-collections", {
			method: "POST",
		});
		return res.value;
	};

	/**
	 * Fetch saved contents (check if items are saved)
	 */
	savedContents = async (contentType: ContentType, contentIds: string[]): Promise<unknown[]> => {
		const res = await this.fetch.request<SavedContentsResponse>("/api/saved/fetch-saved-contents", {
			method: "POST",
			body: JSON.stringify({ contentType, contentIds }),
		});
		return res.value;
	};
}
