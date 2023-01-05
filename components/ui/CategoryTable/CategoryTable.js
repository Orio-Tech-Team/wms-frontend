import React from "react";
import * as Fa from "react-icons/fa";
import styles from "./CategoryTable.module.css";
import {
  Table,
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";
import Link from "next/link";

const CategoryTable = ({ data }) => {
  //
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3001/dashboard/product/category/")
  //       .then((result) => {
  //         console.log(result.data);
  //         setCategories(result.data);
  //       });
  //   }, []);
  //
  return (
    <>
      <Card className={`card-box mb-5 ${styles.card_body}`}>
        <div className="card-header py-3">
          <div className="card-header--title font-size-lg">Category</div>
          <div className="card-header--actions">
            <Link href={"/dashboard/product/category/add_category/"}>
              <a className={styles.add_category_link}>
                <Button size="sm" color="neutral-primary">
                  <span className="btn-wrapper--icon">
                    <Fa.FaPlusCircle />
                    {/* <FontAwesomeIcon icon={["fas", "plus-circle"]} /> */}
                  </span>
                  <span className="btn-wrapper--label">Add Category</span>
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between px-4 py-3">
          <div className="d-flex align-items-center">
            <span>Show</span>
            <select className="mx-1 form-control form-control-sm" id="" name="">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
            <span>entries</span>
          </div>
          <div className="search-wrapper">
            <span className="icon-wrapper text-black">
              <Fa.FaSearch />
              {/* <FontAwesomeIcon icon={["fas", "search"]} /> */}
            </span>
            <input
              className="form-control form-control-sm rounded-pill"
              placeholder="Search terms..."
              type="search"
            />
          </div>
        </div>
        <div className="divider" />
        <div className="table-responsive-md">
          <Table hover className="text-nowrap mb-0">
            <thead>
              <tr>
                <th className="bg-white text-left">ID</th>
                <th className="bg-white">Category Name</th>
                <th className="bg-white text-left">Category Description</th>
                <th className="bg-white text-center">Category Status</th>
                <th className="bg-white text-center">Category Sorting</th>
                <th className="bg-white text-center">Created At</th>
                <th className="bg-white text-center">Updated At</th>
                <th className="bg-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((elem, key) => {
                  return (
                    <tr key={key}>
                      <td className="font-weight-bold">{elem.id}</td>
                      <td>{elem.category_name}</td>
                      <td>{elem.category_description}</td>
                      <td className="text-center">
                        {elem.category_status ? "Active" : "InActive"}
                      </td>
                      <td className="text-center">{elem.category_sorting}</td>

                      <td className="text-center text-black-50">
                        {elem.createdAt.substring(0, 10)}
                      </td>
                      <td className="text-center text-black-50">
                        {elem.updatedAt.substring(0, 10)}
                      </td>
                      <td className="text-center">
                        <Button
                          size="sm"
                          color="link"
                          className="d-30 p-0 btn-icon hover-scale-sm"
                        >
                          <Fa.FaEllipsisH />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Empty</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="card-footer py-3 d-flex justify-content-between">
          <Pagination className="pagination-second">
            <PaginationItem disabled>
              <PaginationLink
                first
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <Fa.FaAngleDoubleLeft />
                {/* <FontAwesomeIcon icon={["fas", "angle-double-left"]} /> */}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <Fa.FaChevronLeft />
                {/* <FontAwesomeIcon icon={["fas", "chevron-left"]} /> */}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <Fa.FaChevronRight />
                {/* <FontAwesomeIcon icon={["fas", "chevron-right"]} /> */}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <Fa.FaAngleDoubleRight />
                {/* <FontAwesomeIcon icon={["fas", "angle-double-right"]} /> */}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
          <div className="d-flex align-items-center">
            <span>Show</span>
            <select className="mx-1 form-control form-control-sm" id="" name="">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
            <span>entries</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CategoryTable;
