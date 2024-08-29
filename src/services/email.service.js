import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    save,
    getEmptyEmail,
    getLoggedinUser,
    _createEmails,
}

const STORAGE_KEY = 'emails';

const loggedinUser = { 
    email: 'user@appsus.com', 
    fullname: 'Mahatma Appsus' 
};

_createEmails();

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = getInitialEmails();
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
}

async function query(filterBy = {}) {
    let emails = await storageService.query(STORAGE_KEY);

    console.log('Initial emails:', emails); // Debugging

    // Filter by status (inbox, sent, trash, star)
    if (filterBy.status) {
        switch (filterBy.status) {
            case 'inbox':
                emails = emails.filter(email => email.to === loggedinUser.email && !email.removedAt && email.from !== loggedinUser.email);
                break;
            case 'sent':
                emails = emails.filter(email => email.from === loggedinUser.email && !email.removedAt);
                break;
            case 'trash':
                emails = emails.filter(email => email.removedAt);
                break;
            case 'starred':
                emails = emails.filter(email => email.isStarred && !email.removedAt);
                break;
            default:
                break;
        }
        console.log(`After ${filterBy.status} filter:`, emails);// Debugging
    }

    // Filter by text (subject or body)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i');
        emails = emails.filter(email => regex.test(email.subject) || regex.test(email.body));
        console.log('After text filter:', emails); // Debugging
    }

    // Filter by read/unread status
    if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
        emails = emails.filter(email => email.isRead === filterBy.isRead);
        console.log('After isRead filter:', emails); // Debugging
    }

    console.log('Final filtered emails:', emails); // Debugging
    return emails;
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id);
}

function save(email) {
    if (email.id) {
        return storageService.put(STORAGE_KEY, email);
    } else {
        email.id = utilService.makeId();
        return storageService.post(STORAGE_KEY, email);
    }
}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: '',
    };
}

function getLoggedinUser() {
    return loggedinUser;
}

function getInitialEmails() {
    return [
        {
            id: 'e101',
            subject: 'Project Proposal',
            body: 'Please review the attached project proposal.',
            isRead: false,
            isStarred: false,
            sentAt: 1621133930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'client@business.com',
        },
        {
            id: 'e102',
            subject: 'Follow-up on Meeting',
            body: 'It was great discussing our collaboration. Looking forward to the next steps.',
            isRead: false,
            isStarred: false,
            sentAt: 1621134930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'partner@business.com',
        },
        {
            id: 'e103',
            subject: 'Invoice for Services',
            body: 'Please find attached the invoice for the recent services provided.',
            isRead: false,
            isStarred: false,
            sentAt: 1621135930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'accounting@client.com',
        },
        {
            id: 'e104',
            subject: 'Thank You!',
            body: 'Thank you for your excellent work on the recent project.',
            isRead: true,
            isStarred: true,
            sentAt: 1621136930594,
            removedAt: null,
            from: 'client@business.com',
            to: 'user@appsus.com',
        },
        {
            id: 'e105',
            subject: 'Urgent: Action Required',
            body: 'Please address the following issues immediately.',
            isRead: true,
            isStarred: true,
            sentAt: 1621137930594,
            removedAt: null,
            from: 'boss@work.com',
            to: 'user@appsus.com',
        },
        {
            id: 'e106',
            subject: 'Meeting Recap',
            body: 'Here’s a summary of the key points discussed in today’s meeting.',
            isRead: true,
            isStarred: true,
            sentAt: 1621138930594,
            removedAt: null,
            from: 'colleague@work.com',
            to: 'user@appsus.com',
        },
        {
            id: 'e107',
            subject: 'Outdated Information',
            body: 'Please ignore the previous email; the information is outdated.',
            isRead: false,
            isStarred: false,
            sentAt: 1621139930594,
            removedAt: 1621140930594,
            from: 'oldpartner@business.com',
            to: 'user@appsus.com',
        },
        {
            id: 'e108',
            subject: 'Weekly Newsletter',
            body: 'Here is your weekly newsletter with updates and tips.',
            isRead: true,
            isStarred: false,
            sentAt: 1621140930594,
            removedAt: 1621141930594,
            from: 'newsletter@service.com',
            to: 'user@appsus.com',
        },
        {
            id: 'e109',
            subject: 'Service Discontinuation Notice',
            body: 'We regret to inform you that the following service will be discontinued.',
            isRead: true,
            isStarred: false,
            sentAt: 1621141930594,
            removedAt: 1621142930594,
            from: 'service@provider.com',
            to: 'user@appsus.com',
        },
    ];
}
