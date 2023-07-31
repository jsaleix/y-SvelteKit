import prisma from '$lib/assets/images/prisma';
import tweetService from './tweet.service';

class BookmarkService {
	async bookmarkTweet(userId: string, tweetId: string) {
		const tweet = await prisma.tweet.findUnique({
			where: {
				id: tweetId
			}
		});

		if(!tweet) throw new Error('Tweet not found');

		const bookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				tweetId
			}
		});

		if(bookmark) throw new Error('Tweet already bookmarked');

		const newBookmark = await prisma.bookmark.create({
			data: {
				userId,
				tweetId
			}
		});

		return newBookmark;
	}

	async removeBookmark(userId: string, tweetId: string) {
		const bookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				tweetId
			}
		});

		if(!bookmark) throw new Error('Bookmark not found');

		await prisma.bookmark.delete({
			where: {
				id: bookmark.id
			}
		});

		return true;
	}

	async getBookmarks(userId: string) {
		const bookmarks = await prisma.bookmark.findMany({
			where: {
				userId
			}
		});

		const tweets = Promise.all(bookmarks.map(async (bookmark) => {
			return await tweetService.getTweet(bookmark.tweetId);
		}));
		
		return tweets;
	}

	async isBookmarked(userId: string, tweetId: string) {
		const bookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				tweetId
			}
		});

		return !!bookmark;
	}
				
}

export default new BookmarkService();
