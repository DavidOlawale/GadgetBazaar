using Microsoft.EntityFrameworkCore.Migrations;

namespace MobileStoreApp.Migrations
{
    public partial class Brandnameinttostring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Devices_DeviceId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_DeviceId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "OrderItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Brands",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Devices_ProductId",
                table: "OrderItems",
                column: "ProductId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Devices_ProductId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Brands",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_DeviceId",
                table: "OrderItems",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Devices_DeviceId",
                table: "OrderItems",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
