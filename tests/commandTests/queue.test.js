const { MessageEmbed } = require('discord.js');
const musicService = require('../../services/musicService');
const queueCommand = require('../../commands/queue');

describe('Queue Command', () => {
  let mockMessage;

  beforeEach(() => {
    mockMessage = {
      member: {
        voice: {
          channel: {
            id: 'mockChannelId',
            guild: {
              id: 'mockGuildId',
            }
          }
        }
      },
      channel: {
        send: jest.fn()
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should send a message if there is no voice channel', async () => {
    mockMessage.member.voice.channel = null;

    await queueCommand.execute(mockMessage);

    expect(mockMessage.channel.send).toHaveBeenCalledWith('You need to be in a voice channel to view the queue!');
  });

  test('should send a message if the queue is empty', async () => {
    jest.spyOn(musicService, 'getQueue').mockResolvedValueOnce([]);
    await queueCommand.execute(mockMessage);

    expect(mockMessage.channel.send).toHaveBeenCalledWith('The queue is currently empty.');
  });

  test('should display the current song queue', async () => {
    const queue = [
      { title: 'Song 1', requestedBy: 'User1' },
      { title: 'Song 2', requestedBy: 'User2' },
    ];
    jest.spyOn(musicService, 'getQueue').mockResolvedValueOnce(queue);
    
    await queueCommand.execute(mockMessage);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Current Song Queue')
      .setDescription('Here are the songs in the queue:')
      .setTimestamp();

    queue.forEach((song, index) => {
      embed.addField(`${index + 1}. ${song.title}`, `Requested by: ${song.requestedBy}`, false);
    });

    expect(mockMessage.channel.send).toHaveBeenCalledWith({ embeds: [embed] });
  });

  test('should handle errors when fetching the queue', async () => {
    const errorMessage = 'Could not fetch queue';
    jest.spyOn(musicService, 'getQueue').mockRejectedValueOnce(new Error(errorMessage));

    await queueCommand.execute(mockMessage);

    expect(mockMessage.channel.send).toHaveBeenCalledWith(expect.stringContaining('An error occurred while trying to fetch the queue. Please try again later.'));
  });
});