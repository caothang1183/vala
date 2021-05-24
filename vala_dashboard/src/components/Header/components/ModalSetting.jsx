import {
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Switch,
  Tooltip,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import "../../../components/Style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalSetting = () => {
  const [open, setOpen] = React.useState(false);
  const [checkButton, setCheckButton] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    var check = window.localStorage.getItem("darkmode");
    if (check == "true") {
      setCheckButton(true);
    } else if (check == "false") {
      setCheckButton(false);
    }
  }, []);

  const handleChange = (event) => {
    var checked = event.target.checked;
    if (checked == true) {
      setCheckButton(true);

      $(
        "#content-wrapper, .sticky-footer, .dropdown-menu-right, .dropdown-menu .dropdown-item, .modal-content, .collapse-inner"
      ).addClass("bg-dark  text-white"); //
      $(".navbar").addClass("bg-dark");
      $("#accordionSidebar").addClass("bg-gradient-dark");
      $("#msg").html(
        "<div class='alert alert-success'><strong>Thành công</strong>, Các tùy chọn đã được lưu thay đổi</div>"
      );
      setTimeout(function () {
        $("#msg").html("");
      }, 3000);
      window.localStorage.setItem("darkmode", true);
    } else if (checked == false) {
      setCheckButton(false);
      $(
        "#content-wrapper,.sticky-footer, .dropdown-menu-right, .dropdown-menu .dropdown-item, .modal-content , .collapse-inner"
      ).removeClass("bg-dark text-white"); //
      $(".navbar").removeClass("bg-dark");
      $("#accordionSidebar").removeClass("bg-gradient-dark");
      $("#msg").html(
        "<div class='alert alert-success'><strong>Thành công</strong>, Các tùy chọn đã được lưu thay đổi</div>"
      );
      setTimeout(function () {
        $("#msg").html("");
      }, 3000);

      window.localStorage.setItem("darkmode", false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <a className="dropdown-item" href="#" onClick={handleClickOpen}>
        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
        Settings
      </a>
      <Tooltip
        title={
          checkButton ? "Chế độ nền tối: Đang bật" : "Chế độ nền tối : Đang tắt"
        }
        placement="left"
      >
        <a className="dropdown-item" href="#" data-target="#logoutModal">
          <i
            className={
              checkButton
                ? "fas fa-moon fa-sm fa-fw mr-2 text-gray-400"
                : "fas fa-sun fa-sm fa-fw mr-2 text-gray-400"
            }
          ></i>
          <Switch
            checked={checkButton}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </a>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        id="dglog"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cài Đặt :
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <strong>Chế độ nền tối : </strong>
            <span>{checkButton ? "Bật" : "Tắt"}</span>
          </Typography>
          <Switch
            checked={checkButton}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />

          <Typography>
            <strong>Ngôn ngữ: </strong> :{" "}
            <span style={{ cursor: "pointer" }} onClick={handleClick}>
              Tiếng Việt
            </span>
            <Tooltip title="Click để chọn ngôn ngữ" placement="left">
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Tiếng Việt</MenuItem>
                <MenuItem onClick={handleCloseMenu}>EngLish</MenuItem>
              </Menu>
            </Tooltip>
          </Typography>
          <Typography>
            <strong>Chú ý</strong>: Các tùy chọn chỉ áp dụng trên trình duyệt
            này.
          </Typography>
          <div id="msg"></div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalSetting;
