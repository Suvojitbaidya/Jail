-- CreateTable
CREATE TABLE `Alert` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cameraId` INTEGER NOT NULL,
    `type` ENUM('HEIGHT', 'COUNT') NOT NULL,
    `noOfPeople` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVisited` BOOLEAN NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `isNotificationSent` BOOLEAN NOT NULL DEFAULT true,
    `notificationSentAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_cameraId_fkey` FOREIGN KEY (`cameraId`) REFERENCES `Camera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
