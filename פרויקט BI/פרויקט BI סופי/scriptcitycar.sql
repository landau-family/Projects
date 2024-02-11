USE [master]
GO
/****** Object:  Database [gillyCityCar]    Script Date: 01/02/2024 13:29:07 ******/
CREATE DATABASE [gillyCityCar]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'gillyCityCar', FILENAME = N'D:\MSSQL\Data\gillyCityCar.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'gillyCityCar_log', FILENAME = N'D:\MSSQL\Data\gillyCityCar_log.ldf' , SIZE = 139264KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [gillyCityCar] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [gillyCityCar].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [gillyCityCar] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [gillyCityCar] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [gillyCityCar] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [gillyCityCar] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [gillyCityCar] SET ARITHABORT OFF 
GO
ALTER DATABASE [gillyCityCar] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [gillyCityCar] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [gillyCityCar] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [gillyCityCar] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [gillyCityCar] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [gillyCityCar] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [gillyCityCar] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [gillyCityCar] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [gillyCityCar] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [gillyCityCar] SET  ENABLE_BROKER 
GO
ALTER DATABASE [gillyCityCar] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [gillyCityCar] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [gillyCityCar] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [gillyCityCar] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [gillyCityCar] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [gillyCityCar] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [gillyCityCar] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [gillyCityCar] SET RECOVERY FULL 
GO
ALTER DATABASE [gillyCityCar] SET  MULTI_USER 
GO
ALTER DATABASE [gillyCityCar] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [gillyCityCar] SET DB_CHAINING OFF 
GO
ALTER DATABASE [gillyCityCar] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [gillyCityCar] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [gillyCityCar] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'gillyCityCar', N'ON'
GO
ALTER DATABASE [gillyCityCar] SET QUERY_STORE = OFF
GO
USE [gillyCityCar]
GO
/****** Object:  Table [dbo].[rentingtbl]    Script Date: 01/02/2024 13:29:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rentingtbl](
	[rentid] [int] IDENTITY(1,1) NOT NULL,
	[carid] [int] NULL,
	[dtfrom] [datetime] NULL,
	[dtto] [datetime] NULL,
	[km] [float] NULL,
	[cost] [numeric](18, 3) NULL,
	[idCustomer] [nvarchar](10) NULL,
	[sug] [int] NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[rentingtbl] ON 

INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (2, 226, CAST(N'2010-03-29T07:07:02.337' AS DateTime), CAST(N'2011-08-16T12:13:40.390' AS DateTime), 1033.6, CAST(10100.000 AS Numeric(18, 3)), N'285554310', 22)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (4, 898, CAST(N'2011-05-21T02:21:41.020' AS DateTime), CAST(N'2012-12-29T14:07:11.497' AS DateTime), 14.89, CAST(11760.000 AS Numeric(18, 3)), N'151897610', 21)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (8, 336, CAST(N'2011-06-24T13:25:07.597' AS DateTime), CAST(N'2011-12-22T13:42:35.350' AS DateTime), 478.5, CAST(3620.000 AS Numeric(18, 3)), N'315856838', 11)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (11, 336, CAST(N'2010-09-25T11:19:08.590' AS DateTime), CAST(N'2011-03-24T09:46:23.450' AS DateTime), 166.14, CAST(3600.000 AS Numeric(18, 3)), N'345159468', 22)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (12, 1003, CAST(N'2010-07-02T04:35:10.560' AS DateTime), CAST(N'2011-03-20T00:17:21.293' AS DateTime), 684.39, CAST(5220.000 AS Numeric(18, 3)), N'328110714', 11)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (13, 106, CAST(N'2011-04-02T18:13:41.210' AS DateTime), CAST(N'2011-11-19T02:55:24.063' AS DateTime), 548.94, CAST(4620.000 AS Numeric(18, 3)), N'172550149', 21)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (14, 188, CAST(N'2010-11-07T22:53:53.530' AS DateTime), CAST(N'2012-03-13T10:09:12.080' AS DateTime), 868.15, CAST(9840.000 AS Numeric(18, 3)), N'153871246', 21)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (15, 929, CAST(N'2010-09-21T20:53:48.007' AS DateTime), CAST(N'2012-02-29T18:26:22.057' AS DateTime), 773.4, CAST(10520.000 AS Numeric(18, 3)), N'84770419', 11)
SET IDENTITY_INSERT [dbo].[rentingtbl] OFF
GO
USE [master]
GO
ALTER DATABASE [gillyCityCar] SET  READ_WRITE 
GO
