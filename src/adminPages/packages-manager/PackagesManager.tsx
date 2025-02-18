import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

interface Package {
  id: string;
  name: string;
  serviceItems: ServiceItem[];
}

interface Category {
  id: string;
  name: string;
  packages: Package[];
}

const PackagesManager: React.FC = () => {
  const { fetch, loading } = useAxios();
  // const [priceList, setPriceList] = useState<Category[]>([]);
  // const [categories, setCategories] = useState<Category[]>([
  //   {
  //     id: "1",
  //     name: "HAIR",
  //     packages: [
  //       {
  //         id: "1",
  //         name: "HAIR CUT",
  //         services: [
  //           { id: "1", name: "Cut & Re-Style (Advance)", price: 4000 },
  //           { id: "2", name: "Fringe Cut", price: 1000 },
  //           { id: "3", name: "Trim", price: 1400 },
  //         ],
  //       },
  //     ],
  //   },
  // ]);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "",
      packages: [
        {
          id: "1",
          name: "",
          serviceItems: [{ id: "1", name: "", price: 0 }],
        },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newPackageName, setNewPackageName] = useState("");
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  // Category states
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Package states
  const [editingPackage, setEditingPackage] = useState<{
    categoryId: string;
    packageId: string;
    name: string;
  } | null>(null);

  // Service states
  const [editingService, setEditingService] = useState<{
    categoryId: string;
    packageId: string;
    serviceId: string;
    name: string;
    price: number;
  } | null>(null);

  const loadPriceList = async () => {
    try {
      const { data } = await fetch({
        url: "/api/categories",
        method: "GET",
      });
      if (data.success && data.data.length > 0) {
        console.log(selectedPackage);
        setCategories(data.data);
        if (
          !data.data.some(
            (category: Category) => category.id === selectedCategory
          )
        ) {
          setSelectedCategory(data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      toast.error("Failed to fetch prices. Please try again.");
    }
  };

  useEffect(() => {
    loadPriceList();
  }, []);

  // Category operations
  const addCategory = async () => {
    if (newCategoryName.trim()) {
      // setCategories([
      //   ...categories,
      //   {
      //     id: String(Date.now()),
      //     name: newCategoryName.toUpperCase(),
      //     packages: [],
      //   },
      // ]);
      try {
        const { data } = await fetch({
          url: "/api/categories",
          method: "POST",
          data: { name: newCategoryName },
        });
        if (data.success) {
          setNewCategoryName("");
          toast.success("Category added successfully");
          loadPriceList();
        }
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const deleteCategory = async (categoryId: string) => {
    // const updatedCategories = categories.filter((c) => c.id !== categoryId);
    // setCategories(updatedCategories);
    //add confirm box
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return null;
    } else {
      try {
        await fetch({
          url: `/api/categories/${categoryId}`,
          method: "DELETE",
        });
        toast.success("Category deleted successfully");
        loadPriceList();
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const updateCategory = async (categoryId: string, newName: string) => {
    // setCategories(
    //   categories.map((cat) =>
    //     cat.id === categoryId ? { ...cat, name: newName.toUpperCase() } : cat
    //   )
    // );
    try {
      const { data } = await fetch({
        url: `/api/categories/${categoryId}`,
        method: "PUT",
        data: { name: newName },
      });
      if (data.success) {
        toast.success("Category name updated successfully");
        loadPriceList();
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Package operations
  const addPackage = async (categoryId: string) => {
    if (newPackageName.trim()) {
      try {
        const { data } = await fetch({
          url: "/api/packages",
          method: "POST",
          data: {
            categoryId: categoryId,
            name: newPackageName,
          },
        });
        if (data.success) {
          setNewPackageName("");

          toast.success("Package added successfully");
          loadPriceList();
        }
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const deletePackage = async (categoryId: string, packageId: string) => {
    if (!window.confirm("Are you sure you want to delete this Package?")) {
      console.log(categoryId);
      return null;
    } else {
      try {
        await fetch({
          url: `/api/packages/${packageId}`,
          method: "DELETE",
        });
        toast.success("Package deleted successfully");
        loadPriceList();
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const updatePackage = async (
    categoryId: string,
    packageId: string,
    newName: string
  ) => {
    // setCategories(
    //   categories.map((category) =>
    //     category.id === categoryId
    //       ? {
    //           ...category,
    //           packages: category.packages.map((pkg) =>
    //             pkg.id === packageId ? { ...pkg, name: newName } : pkg
    //           ),
    //         }
    //       : category
    //   )
    // );
    try {
      const { data } = await fetch({
        url: `/api/packages/${packageId}`,
        method: "PUT",
        data: { name: newName },
      });
      if (data.success) {
        toast.success("Package name updated successfully");
        loadPriceList();
      }
    } catch (error) {
      console.error("Error :", error);
      console.error(categoryId);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Service operations
  const addService = async (packageId: string) => {
    if (newService.name.trim() && newService.price) {
      try {
        const { data } = await fetch({
          url: "/api/service-items",
          method: "POST",
          data: {
            packageId: packageId,
            name: newService.name,
            price: Number(newService.price),
          },
        });
        if (data.success) {
          setNewService({ name: "", price: "" });

          toast.success("Service Item added successfully");
          loadPriceList();
        }
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const deleteService = async (
    categoryId: string,
    packageId: string,
    serviceId: string
  ) => {
    if (!window.confirm("Are you sure you want to delete this Service Item?")) {
      console.log(categoryId);
      console.log(packageId);
      return null;
    } else {
      try {
        await fetch({
          url: `/api/service-items/${serviceId}`,
          method: "DELETE",
        });
        toast.success("Service Item deleted successfully");
        loadPriceList();
      } catch (error) {
        console.error("Error :", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const updateService = async (
    categoryId: string,
    packageId: string,
    serviceId: string,
    newName: string,
    newPrice: number
  ) => {
    // setCategories(
    //   categories.map((category) =>
    //     category.id === categoryId
    //       ? {
    //           ...category,
    //           packages: category.packages.map((pkg) =>
    //             pkg.id === packageId
    //               ? {
    //                   ...pkg,
    //                   serviceItems: pkg.serviceItems.map((service) =>
    //                     service.id === serviceId
    //                       ? {
    //                           ...service,
    //                           name: newName,
    //                           price: newPrice,
    //                         }
    //                       : service
    //                   ),
    //                 }
    //               : pkg
    //           ),
    //         }
    //       : category
    //   )
    // );
    try {
      const { data } = await fetch({
        url: `/api/service-items/${serviceId}`,
        method: "PUT",
        data: { name: newName, price: newPrice },
      });
      if (data.success) {
        toast.success("Service Item updated successfully");
        loadPriceList();
      }
    } catch (error) {
      console.error("Error :", error);
      console.error(categoryId);
      console.error(packageId);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Salon Services Management
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button disabled={loading} onClick={addCategory}>
                    Add
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className=" space-x-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center bg-muted rounded-md"
                >
                  <TabsTrigger value={category.id} className="">
                    {category.name}
                  </TabsTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingCategory({
                        id: category.id,
                        name: category.name,
                      });
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCategory(category.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </TabsList>

            {/* Edit Category Dialog */}
            <Dialog
              open={!!editingCategory}
              onOpenChange={(open) => !open && setEditingCategory(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <Input
                  value={editingCategory?.name || ""}
                  onChange={(e) =>
                    editingCategory &&
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                />
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (editingCategory) {
                      updateCategory(editingCategory.id, editingCategory.name);
                      setEditingCategory(null);
                    }
                  }}
                >
                  Save
                </Button>
              </DialogContent>
            </Dialog>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {category.name} Packages
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <PlusCircle className="w-4 h-4" />
                          Add Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New Package</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <Input
                            placeholder="Package Name"
                            value={newPackageName}
                            onChange={(e) => setNewPackageName(e.target.value)}
                          />
                          <Button
                            disabled={loading}
                            onClick={() => {
                              addPackage(category.id);
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.packages.map((pkg) => (
                      <Card key={pkg.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{pkg.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditingPackage({
                                    categoryId: category.id,
                                    packageId: pkg.id,
                                    name: pkg.name,
                                  })
                                }
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  deletePackage(category.id, pkg.id)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Dialog
                                onOpenChange={(open) => {
                                  if (open) setSelectedPackage(pkg.id);
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Add Service
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>New Service</DialogTitle>
                                  </DialogHeader>
                                  <div className="flex flex-col gap-4">
                                    <Input
                                      placeholder="Service Name"
                                      value={newService.name}
                                      onChange={(e) =>
                                        setNewService({
                                          ...newService,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                    <Input
                                      type="number"
                                      placeholder="Price"
                                      value={newService.price}
                                      onChange={(e) =>
                                        setNewService({
                                          ...newService,
                                          price: e.target.value,
                                        })
                                      }
                                    />
                                    <Button
                                      disabled={loading}
                                      onClick={() => {
                                        addService(pkg.id);
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {pkg?.serviceItems?.map((service) => (
                              <div
                                key={service.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <span>{service.name}</span>
                                <div className="flex items-center gap-4">
                                  <span className="font-semibold">
                                    Rs. {service.price.toLocaleString()}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setEditingService({
                                        categoryId: category.id,
                                        packageId: pkg.id,
                                        serviceId: service.id,
                                        name: service.name,
                                        price: service.price,
                                      })
                                    }
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      deleteService(
                                        category.id,
                                        pkg.id,
                                        service.id
                                      )
                                    }
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}

            {/* Edit Package Dialog */}
            <Dialog
              open={!!editingPackage}
              onOpenChange={(open) => !open && setEditingPackage(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Package</DialogTitle>
                </DialogHeader>
                <Input
                  value={editingPackage?.name || ""}
                  onChange={(e) =>
                    editingPackage &&
                    setEditingPackage({
                      ...editingPackage,
                      name: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={() => {
                    if (editingPackage) {
                      updatePackage(
                        editingPackage.categoryId,
                        editingPackage.packageId,
                        editingPackage.name
                      );
                      setEditingPackage(null);
                    }
                  }}
                >
                  Save
                </Button>
              </DialogContent>
            </Dialog>

            {/* Edit Service Dialog */}
            <Dialog
              open={!!editingService}
              onOpenChange={(open) => !open && setEditingService(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Service</DialogTitle>
                </DialogHeader>
                <Input
                  value={editingService?.name || ""}
                  onChange={(e) =>
                    editingService &&
                    setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  value={editingService?.price || ""}
                  onChange={(e) =>
                    editingService &&
                    setEditingService({
                      ...editingService,
                      price: Number(e.target.value),
                    })
                  }
                />
                <Button
                  onClick={() => {
                    if (editingService) {
                      updateService(
                        editingService.categoryId,
                        editingService.packageId,
                        editingService.serviceId,
                        editingService.name,
                        editingService.price
                      );
                      setEditingService(null);
                    }
                  }}
                >
                  Save
                </Button>
              </DialogContent>
            </Dialog>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackagesManager;
