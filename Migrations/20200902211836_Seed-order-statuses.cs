using Microsoft.EntityFrameworkCore.Migrations;

namespace MobileStoreApp.Migrations
{
    public partial class Seedorderstatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "OrderStatuses",
                columns: new[] { "Id", "Value" },
                values: new object[] { 1, "Ordered" });

            migrationBuilder.InsertData(
                table: "OrderStatuses",
                columns: new[] { "Id", "Value" },
                values: new object[] { 2, "Being Shippped" });

            migrationBuilder.InsertData(
                table: "OrderStatuses",
                columns: new[] { "Id", "Value" },
                values: new object[] { 3, "Delivered" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
