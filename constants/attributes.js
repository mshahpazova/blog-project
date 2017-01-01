'use strict';
module.exports = {
  userAttributes: ['id', 'firstName', 'lastName', 'username', 'email', 'profilePhoto'],

  postAttributes: [
    'id',
    'text',
    'author',
    'authorId',
    'createdAt',
    'updatedAt',
    'image',
    'postable',
    'postableId',
    'youtubeLink'
  ],

  eventAttributes: [
    'name',
    'type',
    'goal',
    'description',
    'shortDescription',
    'categoryId',
    'duration',
    'id',
    'photo',
    'location',
    'createdAt',
    'updatedAt',
    'start',
    'organizerId',
    'causeId',
    'neededParticipants'
  ],
  causeAttributes: [
    'id',
    'name',
    'type',
    'description',
    'goal',
    'shortDescription',
    'photo',
    'categoryId',
    'organizerId',
    'organizationId',
    'createdAt',
    'updatedAt'
  ],

  dcAttributes: [
    'name',
    'type',
    'goal',
    'description',
    'shortDescription',
    'categoryId',
    'createdAt',
    'updatedAt',
    'organizerId',
    'dueDate',
    'location',
    'address',
    'donationType',
    'photo',
    'money',
    'goods',
    'id',
    'donationGuide',
    'causeId'
  ],

  categoryAttributes: [
    'id',
    'name',
    'color',
    'description',
    'createdAt',
    'updatedAt',
    'icon'
  ],

  badUserAttributes: ['hash', 'facebookId', 'accessToken']
};
