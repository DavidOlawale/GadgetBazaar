using Microsoft.EntityFrameworkCore.Migrations;

namespace MobileStoreApp.Migrations
{
    public partial class Addpropertiestoproductclass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BatteryCapacity",
                table: "Devices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChargingTime",
                table: "Devices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Devices",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "SizeInGram",
                table: "Devices",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "StandByTime",
                table: "Devices",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatteryCapacity",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "ChargingTime",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "SizeInGram",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "StandByTime",
                table: "Devices");
        }
    }
}
