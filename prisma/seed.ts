import { PrismaClient, Priority, TicketStatus, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const password = await bcrypt.hash('123456', 10);

    const admin = await prisma.user.upsert({
        where: {
            email: 'admin@helpdesk.com',
        },
        update: {},
        create: {
            name: 'Administrador',
            email: 'admin@helpdesk.com',
            password,
            role: Role.ADMIN,
        },
    });

    const support = await prisma.user.upsert({
        where: {
            email: 'support@helpdesk.com',
        },
        update: {},
        create: {
            name: 'Suporte',
            email: 'support@helpdesk.com',
            password,
            role: Role.SUPPORT,
        },
    });

    const user = await prisma.user.upsert({
        where: {
            email: 'user@helpdesk.com',
        },
        update: {},
        create: {
            name: 'Jeferson',
            email: 'user@helpdesk.com',
            password,
            role: Role.USER,
        },
    });


    const ticket = await prisma.ticket.create({
        data: {
            title: 'Erro ao realizar login',
            description: 'Usuário informa que não consegue acessar o sistema.',
            priority: Priority.HIGH,
            status: TicketStatus.OPEN,

            createdById: user.id,
        },
    });

    await prisma.comment.create({
        data: {
            content: 'Estamos analisando o problema.',
            ticketId: ticket.id,
            userId: support.id,
        },
    });

    await prisma.log.create({
        data: {
            action: 'Ticket criado',
            ticketId: ticket.id,
            userId: user.id,
        },
    });


    const assignedTicket = await prisma.ticket.create({
        data: {
            title: 'Impressora não funciona',
            description: 'A impressora do setor financeiro não imprime.',

            priority: Priority.MEDIUM,
            status: TicketStatus.IN_PROGRESS,

            createdById: user.id,

            assignedToId: support.id,
        },
    });

    await prisma.comment.create({
        data: {
            content: 'Estou verificando a impressora.',
            ticketId: assignedTicket.id,
            userId: support.id,
        },
    });

    await prisma.log.create({
        data: {
            action: 'Ticket atribuído ao suporte.',
            ticketId: assignedTicket.id,
            userId: admin.id,
        },
    });

    await prisma.ticket.create({
        data: {
            title: 'Solicitação concluída',
            description: 'Problema resolvido.',

            priority: Priority.LOW,
            status: TicketStatus.CLOSED,

            createdById: user.id,
            assignedToId: support.id,
        },
    });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });