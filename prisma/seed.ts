import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function seedStudent() {
    await prisma.student.create({
        data: {
            firstName: "Warawut",
            lastName: "Ninrat",
            major: "Computer Science",
            faculty: "Science",
            email: "warawutninrat010@gmail.com",
            phone: "0973099633"
        }
    })
}

async function main() {

    await seedStudent();
    console.log("Seeding finished.");
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });