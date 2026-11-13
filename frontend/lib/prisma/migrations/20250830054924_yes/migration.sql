-- DropForeignKey
ALTER TABLE `alert` DROP FOREIGN KEY `Alert_cameraId_fkey`;

-- DropIndex
DROP INDEX `Alert_cameraId_fkey` ON `alert`;

-- AlterTable
ALTER TABLE `alert` MODIFY `type` ENUM('HEIGHT', 'COUNT', 'BENDING') NOT NULL;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_cameraId_fkey` FOREIGN KEY (`cameraId`) REFERENCES `Camera`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
